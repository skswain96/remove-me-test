import React from "react";

import {
  TokenAccount,
  getAnchor,
  customNumberFormatter,
} from "@bridgesplit/sdk";
import { PublicKey } from "@solana/web3.js";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Divider,
  Text,
  Space,
  Skeleton,
  Transition,
} from "@mantine/core";
import { useStyles } from "@/styles/components/stakeAssetCard.style";

import {
  StakeAccountInterface,
  StakeManagerInterface,
  StakeStatus,
} from "@bridgesplit/staking-sdk";
import Image from "next/image";
import { getOrCreateATA, getTokenAccount } from "@saberhq/token-utils";
import { useRouter } from "next/router";
import {
  claimOOO,
  restakeParticle,
  stakeParticle,
  unstakeParticle,
} from "./stakingFunctions";

export interface StakedAssetCardProps {
  staked: boolean;
  metadata?: any;
  mint?: string;
  address?: string;
  stakeAccount?: StakeAccountInterface;
  stakeManager?: StakeManagerInterface;
  hash?: string;
  tokenAccount?: TokenAccount;
  setIsLoading?: (isLoading: boolean) => void;
}

const StakedAssetCard: React.FC<StakedAssetCardProps> = ({
  staked,
  metadata,
  mint,
  stakeManager,
  address,
  hash,
  stakeAccount,
  setIsLoading = () => {},
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const anchorState = useSelector(getAnchor);
  const { classes } = useStyles();

  const getRedeemableRewards = () => {
    if (!stakeAccount || !stakeManager) return 0;
    if (
      // @ts-ignore
      stakeAccount.rewardsClaimed?.toNumber() >=
      // @ts-ignore
      stakeAccount.maxRewards?.toNumber()
    ) {
      return 0;
    }

    let endTime = Math.floor(new Date().getTime() / 1000);
    let startTime = stakeAccount.lastClaimTime;
    if (stakeAccount.state !== StakeStatus.STAKED) {
      endTime = stakeAccount.lastUnstakeTime;
    }
    if (stakeAccount.lastStakeTime > startTime) {
      startTime = stakeAccount.lastStakeTime;
    }
    const netStakedTime = endTime - startTime;
    if (
      netStakedTime < stakeManager.cliff &&
      stakeAccount.rewardsClaimed === 0
    ) {
      return 0;
    }
    let rewards = netStakedTime * stakeManager.d;
    if (stakeManager.e) rewards = rewards / stakeManager.e;
    const rewardsPossible =
      stakeAccount.maxRewards - stakeAccount.rewardsClaimed;
    if (rewards > rewardsPossible) rewards = rewardsPossible;
    return Math.max(rewards, 0);
  };

  const handleRestake = async () => {
    if (!stakeAccount || !stakeManager || !hash) return;
    setIsLoading(true);
    enqueueSnackbar("Restaking your NFT", {
      variant: "info",
    });
    const atai = await getOrCreateATA({
      provider: anchorState.provider,
      mint: new PublicKey(stakeAccount.nftMint),
      owner: new PublicKey(stakeManager.stakeManagerPubkey),
      payer: anchorState.wallet?.publicKey,
    });
    const ta = await getTokenAccount(anchorState.provider, atai.address);
    let acc;
    if (!atai.instruction && ta.amount.toNumber() > 0) {
      acc = atai.address;
    } else if (anchorState.wallet?.publicKey !== undefined) {
      const userAccounts = (
        await anchorState.provider.connection.getParsedTokenAccountsByOwner(
          anchorState.wallet?.publicKey,
          {
            programId: new PublicKey(
              "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            ),
          }
        )
      ).value;
      const filteredAccount = userAccounts.filter((ua) => {
        return (
          ua.account.data.parsed.info.mint.toString() ===
          stakeAccount.nftMint.toString()
        );
      });
      if (filteredAccount.length > 0) {
        const fa = filteredAccount[0];
        acc = fa.pubkey;
      }
    }

    if (!acc) {
      return;
    }

    const { success, message, reloadNeeded } = await restakeParticle({
      anchorState,
      stakeAccount,
      stakeManager,
      account: acc,
      hash,
    });
    enqueueSnackbar(message, {
      variant: success ? "success" : "error",
    });
    if (reloadNeeded) router.reload();
  };

  const handleUnstakeAndClaim = async () => {
    if (!stakeAccount || !stakeManager || !hash) return;

    enqueueSnackbar("Unstaking your NFT", {
      variant: "info",
    });
    setIsLoading(true);

    const {
      success: claimSuccess,
      message: claimMessage,
      reloadNeeded: claimReload,
    } = await claimOOO({
      anchorState,
      stakeAccount,
      stakeManager,
    });

    enqueueSnackbar(claimMessage, {
      variant: claimSuccess ? "success" : "error",
    });

    const {
      success: unstakeSuccess,
      message: unstakeMessage,
      reloadNeeded: unstakeReload,
    } = await unstakeParticle({
      anchorState,
      stakeAccount,
      stakeManager,
      hash,
    });

    enqueueSnackbar(unstakeMessage, {
      variant: unstakeSuccess ? "success" : "error",
    });

    if (claimReload || unstakeReload) router.reload();
  };

  const handleClaimRewards = async () => {
    if (!stakeAccount || !stakeManager) return;
    enqueueSnackbar("Claiming your rewards", {
      variant: "info",
    });
    setIsLoading(true);

    const { success, message, reloadNeeded } = await claimOOO({
      anchorState,
      stakeAccount,
      stakeManager,
    });

    enqueueSnackbar(message, {
      variant: success ? "success" : "error",
    });

    if (reloadNeeded) router.reload();
  };

  const handleStakeAsset = async () => {
    if (!hash || !address || !stakeManager || !mint) return;
    enqueueSnackbar("Staking your NFT", {
      variant: "info",
    });
    setIsLoading(true);
    const { success, message, reloadNeeded } = await stakeParticle({
      anchorState,
      mint,
      stakeManager,
      address,
      hash,
    });
    enqueueSnackbar(message, {
      variant: success ? "success" : "error",
    });
    if (reloadNeeded) router.reload();
  };

  const redeemableRewards = getRedeemableRewards() / 10 ** 2;

  const StakedActions = () => (
    <>
      <Button
        onClick={handleUnstakeAndClaim}
        type="button"
        variant="outline"
        color="grape"
        radius="md"
        fullWidth
      >
        <Text size="sm" color="grape">
          Unstake
        </Text>
      </Button>
      <Space w="xl" />
      <Button
        onClick={handleClaimRewards}
        type="button"
        variant="filled"
        color="grape"
        radius="md"
        fullWidth
      >
        <Text size="sm" color="white">
          Claim
        </Text>
      </Button>
    </>
  );

  const UnstakedActions = () => (
    <Button
      onClick={
        stakeAccount && stakeAccount.state === StakeStatus.UNSTAKED
          ? handleRestake
          : handleStakeAsset
      }
      type="button"
      variant="filled"
      color="grape"
      radius="md"
      fullWidth
    >
      <Text size="sm" color="white">
        Stake
      </Text>
    </Button>
  );

  return (
    <Transition
      mounted={true}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <Card
          shadow="sm"
          p="lg"
          radius="lg"
          style={{
            ...styles,
            padding: 0,
          }}
        >
          {!stakeAccount ? (
            <>
              <Skeleton
                visible={true}
                radius="md"
                height={280}
                animate={false}
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[0],
                  "&:hover": {
                    backgroundColor: theme.colors.gray[0],
                  },
                })}
              />
              <Card.Section>
                <div className={classes.textContent}>
                  <Skeleton
                    visible={false}
                    height={43}
                    sx={(theme) => ({
                      backgroundColor: theme.colors.white[0],
                      "&:hover": {
                        backgroundColor: theme.colors.white[0],
                      },
                    })}
                    animate={false}
                  />
                </div>
                <div className={classes.cardActionContainer}>
                  <Skeleton
                    radius="md"
                    visible={true}
                    height={36}
                    animate={false}
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[0],
                      "&:hover": {
                        backgroundColor: theme.colors.gray[0],
                      },
                    })}
                  />
                </div>
              </Card.Section>
            </>
          ) : (
            <>
              <Card.Section style={{ height: 280, position: "relative" }}>
                <Image
                  src={metadata?.image || "/images/plogo.svg"}
                  layout="fill"
                  alt="artwork"
                  objectFit="cover"
                />
              </Card.Section>
              <Card.Section>
                <div className={classes.cardContentContainer}>
                  <div className={classes.textContainer}>
                    <div className={classes.textContent}>
                      <Text size="xs" color="dark">
                        {stakeAccount
                          ? metadata?.name.split("#")[0]
                          : metadata?.data?.name.split("#")[0]}
                      </Text>
                      <Text size="md" color="dark" weight="bold">
                        #
                        {stakeAccount
                          ? metadata?.name.split("#")[1]
                          : metadata?.data?.name.split("#")[1]}
                      </Text>
                    </div>
                  </div>
                  <Divider
                    sx={{ height: "42px" }}
                    variant="solid"
                    orientation="vertical"
                  />
                  <div className={classes.textContainer}>
                    <div className={classes.textContent}>
                      <div className={classes.textWrapper}>
                        <Text size="xs" color="grape">
                          $OOO
                        </Text>
                        <Text size="xs" color="dark" style={{ marginLeft: 4 }}>
                          {staked ? "Earned" : "/ DAY"}
                        </Text>
                      </div>
                      <Text size="md" color="dark" weight="bold">
                        {(redeemableRewards &&
                          customNumberFormatter(2).format(redeemableRewards)) ||
                          "N/A"}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={classes.cardActionContainer}>
                  {staked ? <StakedActions /> : <UnstakedActions />}
                </div>
              </Card.Section>
            </>
          )}
        </Card>
      )}
    </Transition>
  );
};

export default StakedAssetCard;
