import React from "react";
import { Button, Text, Card } from "@mantine/core";
import PageWrapper from "@/components/Wrappers/PageWrapper";
import PageHeader from "@/components/PageHeader/PageHeader";
import WalletConnectedView from "./View/WalletConnectedView";
import WalletNotConnectedView from "./View/WalletNotConnectedView";

import { getHash, isDevnet, Nft, useUserNftsQuery } from "@bridgesplit/sdk";

import {
  StakeAccountInterface,
  StakeStatus,
  useAllUserStakeAccounts,
  useStakeManagerWithHash,
} from "@bridgesplit/staking-sdk";

import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useConnectedWallet } from "@saberhq/use-solana";
import { PublicKey } from "@solana/web3.js";

import { useStyles } from "@/styles/containers/staking.style";

const DEV_HASH =
  "cffd2af7dacc32f0c590abd313a01df2eca6f8edc3672db2af2e190968c5baef";
const PARTICLES_HASH =
  "906297cd45c663691d130bd2d89d393fb4685fbe251651ca041e9eb541867de0";

const HASH = isDevnet ? DEV_HASH : PARTICLES_HASH;

const REWARDS_TOKEN_MINT_ADDRESS =
  "BDNRJZ6MA3YRhHcewYMjRDEc7oWQCxHknXU98wwTsSxu";

const Staking = () => {
  const [filterType, setFilterType]: any = React.useState("");

  const { classes } = useStyles();
  const wallet = useConnectedWallet();

  const { stakeManager, loading } = useStakeManagerWithHash(HASH);
  let { stakeAccounts } = useAllUserStakeAccounts(
    stakeManager?.stakeManagerPubkey
      ? new PublicKey(stakeManager?.stakeManagerPubkey)
      : undefined
  );

  const { data } = useUserNftsQuery(wallet?.publicKey.toString() ?? skipToken, {
    skip: !wallet,
  });

  const stakedParticles = stakeAccounts?.filter((stakeAccount) => {
    return stakeAccount.state !== StakeStatus.UNSTAKED;
  }).length;

  function getRewardsPerDay(numStaked: number) {
    if (stakeManager && stakeManager.e) {
      return (
        (stakeManager.d * 24 * 60 * 60 * numStaked) / (100 * stakeManager.e)
      );
    }
    return 0;
  }

  function filterData(type: string) {
    setFilterType(type);
  }

  let nftsToRestake = React.useMemo(
    () =>
      stakeAccounts?.filter(
        (stakeAccount) => stakeAccount.state === StakeStatus.UNSTAKED
      ) || [],
    [stakeAccounts]
  );

  let nftsNeverStaked =
    data
      ?.map((nft) => {
        const stakedNftMints = stakeAccounts?.map((stakeAccount) =>
          stakeAccount.nftMint.toString()
        );
        if (stakedNftMints?.includes(nft.metadata.mint)) return null;
        if (getHash(nft.metadata) !== HASH) return null;

        return nft;
      })
      .filter((nft) => nft != null) || [];

  let stakedNfts = React.useMemo(
    () =>
      stakeAccounts?.filter(
        (stakeAccount) => stakeAccount.state === StakeStatus.STAKED
      ) || [],
    [stakeAccounts]
  );

  let unstakedNfts: ((Nft | StakeAccountInterface | null) & {
    hasStakeAccount: boolean;
  })[] =
    [...nftsNeverStaked, ...nftsToRestake].map((unstakedNft) => {
      if ((unstakedNft as StakeAccountInterface).stakeAccountPubkey) {
        return {
          ...(unstakedNft as StakeAccountInterface),
          hasStakeAccount: true,
        };
      } else {
        return { ...(unstakedNft as Nft), hasStakeAccount: false };
      }
    }) || [];

  let view: any;

  let filteredStakeData = [...stakedNfts, ...unstakedNfts] || [];

  if (filterType === "staked") {
    filteredStakeData = [...stakedNfts] || [];
  }

  if (filterType === "unstaked") {
    filteredStakeData = [...unstakedNfts] || [];
  }

  if (wallet) {
    view = (
      <WalletConnectedView
        data={filteredStakeData}
        stakeManager={stakeManager}
        HASH={HASH}
      />
    );
  } else {
    view = <WalletNotConnectedView />;
  }

  return (
    <PageWrapper
      PageHeader={() => (
        <PageHeader
          title="Stake"
          label="FILTER BY"
          radioOptions={[
            { label: "Staked", value: "staked" },
            { label: "Unstaked", value: "unstaked" },
          ]}
          handleRadioChange={filterData}
          filterType={filterType}
        />
      )}
      PageAction={() => (
        <Card shadow="md" p="xs" className={classes.cardWrapper}>
          <div className={classes.cardContentContainer}>
            <div className={classes.infoStatContainer}>
              <div className={`${classes.infoStats} ${classes.borderRight}`}>
                <Text
                  className={classes.label}
                  size="xs"
                  weight="normal"
                  color="dark"
                >
                  Particles Staked
                </Text>
                <Text size="md" weight="bold" color="dark">
                  {wallet ? `${stakedParticles || 0}` : `-`}
                </Text>
              </div>

              <div className={`${classes.infoStats}  ${classes.borderRight}`}>
                <Text
                  className={classes.label}
                  size="xs"
                  weight="normal"
                  color="dark"
                >
                  In Wallet
                </Text>
                <Text size="md" weight="bold" color="dark">
                  {wallet ? `3` : `-`}
                </Text>
              </div>

              <div className={`${classes.infoStats}`}>
                <div className={classes.infoTextContainer}>
                  <Text
                    className={classes.label}
                    size="xs"
                    weight="normal"
                    color="dark"
                  >
                    Available{" "}
                  </Text>
                  <div style={{ marginLeft: 4 }}>
                    <Text
                      className={classes.label}
                      size="xs"
                      weight="normal"
                      color="grape"
                    >
                      $OOO
                    </Text>
                  </div>
                </div>
                <Text size="md" weight="bold" color="dark">
                  {wallet
                    ? `${getRewardsPerDay(stakedParticles || 0).toFixed(0)}`
                    : `-`}
                </Text>
              </div>
            </div>
            <div
              className={classes.actionContainer}
              style={{ opacity: !wallet ? 0.1 : 1 }}
            >
              <Button
                type="button"
                variant="outline"
                color="grape"
                radius="md"
                // fullWidth
              >
                <Text size="sm" color="grape">
                  Unstake All
                </Text>
              </Button>
              {/* <Space /> */}
              <div style={{ marginLeft: 16 }}>
                <Button
                  type="button"
                  variant="filled"
                  color="grape"
                  radius="md"
                  // fullWidth
                >
                  <Text size="sm" color="white">
                    Claim All
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    >
      {view}
    </PageWrapper>
  );
};

export default Staking;
