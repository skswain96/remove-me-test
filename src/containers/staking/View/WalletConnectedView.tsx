import React from "react";
import { SimpleGrid, Text } from "@mantine/core";
import { StakeAccountInterface } from "@bridgesplit/staking-sdk";
import { Nft } from "@bridgesplit/sdk";

import { useStyles } from "@/styles/containers/walletConnected.style";

import StakedAssetCard from "./StakeAssetCard/StakeAssetCard";

const WalletConnectedView = ({ data, stakeManager, HASH }: any) => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = React.useState(false);

  if (!stakeManager) return null;

  return (
    <>
      <SimpleGrid
        cols={data.length > 0 ? 3 : 1}
        spacing="xl"
        breakpoints={[
          { maxWidth: 992, cols: 2, spacing: "lg" },
          { maxWidth: 768, cols: 1, spacing: "lg" },
          { maxWidth: 576, cols: 1, spacing: "lg" },
        ]}
      >
        {data.map((nft: any, index: any) => {
          let cardProps: any = {
            setIsLoading,
            hash: HASH,
            staked: false,
            stakeManager,
            metadata: nft.metadata,
          };
          if (nft.hasStakeAccount) {
            const stakeAccount = nft as StakeAccountInterface;
            cardProps = {
              ...cardProps,
              stakeAccount,
              // @ts-ignore
              metadata: stakeAccount.metadata.metadata,
            };
          } else {
            const currentNft = nft as Nft;
            const nftMint = currentNft?.metadata.mint;
            const nftAddress = currentNft?.address;
            cardProps = {
              ...cardProps,
              mint: nftMint,
              address: nftAddress,
            };
          }

          return <StakedAssetCard key={index} {...cardProps} />;
        })}
        {data.length === 0 && (
          <div
            style={{
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              marginTop: "12%",
            }}
          >
            <Text size="sm" color="dark">
              No Data
            </Text>
          </div>
        )}
      </SimpleGrid>
    </>
  );
};

export default WalletConnectedView;
