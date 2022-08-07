import React from "react";
import { useWalletKit } from "@gokiprotocol/walletkit";
import Image from "next/image";
import {
  Button,
  Card,
  Text,
  Space,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import { useStyles } from "@/styles/containers/walletNotConnected.style";

const WalletNotConnectedView = () => {
  const { connect } = useWalletKit();
  const { classes } = useStyles();

  const theme = useMantineTheme();

  return (
    <Card className={classes.cardWrapper}>
      <div className={classes.noStateContainer}>
        <Image
          src="/images/core/particles-emblem.svg"
          height={120}
          width={110}
          alt="particles emblem"
        />
        <Space h="lg" />
        <Text
          align="center"
          color={theme.colors.gray[6]}
          weight="bold"
          size="lg"
        >
          Connect your wallet to begin
        </Text>
      </div>

      <Divider my="sm" style={{ margin: `32px 0px` }} />

      <div className={classes.noStateContainer}>
        <Text
          align="center"
          color={theme.colors.gray[6]}
          weight="bold"
          size="lg"
        >
          Need more Particles?
        </Text>
        <Space h="lg" />
        <Button variant="filled" color="grape" radius="xl">
          <Image
            src="/images/core/magin-eden-logo.svg"
            height={120}
            width={110}
            alt="particles emblem"
          />
        </Button>
      </div>
    </Card>
  );
};

export default WalletNotConnectedView;
