import React from "react";
import Image from "next/image";
import {
  useConnectedWallet,
  useSolana,
  useWalletKit,
} from "@gokiprotocol/walletkit";
import {
  Button,
  Anchor,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { HeaderOptions } from "@/constants/header.constants";

import { useHeaderStyles } from "@/styles/components/header.style";

interface Props {
  action?: any;
  opened?: boolean;
  onClickBurger?: any;
}

const Header: React.FC<Props> = ({ action, opened = false, onClickBurger }) => {
  const { classes } = useHeaderStyles();
  const theme = useMantineTheme();
  const { disconnect } = useSolana();
  const { connect } = useWalletKit();
  const wallet = useConnectedWallet();

  const base58 = React.useMemo(
    () => wallet?.publicKey?.toBase58(),
    [wallet?.publicKey]
  );
  const walletAddress = React.useMemo(() => {
    return base58?.slice(0, 4) + ".." + base58?.slice(-4);
  }, [base58]);

  console.log(walletAddress);

  return (
    <header className={classes.headerContainer}>
      <div
        className={classes.logoContainer}
        onClick={() => window?.open("https://particlesnft.io/", "_blank")}
      >
        <Image
          width={30}
          height={30}
          objectFit="contain"
          src="/images/core/logo-mantine.svg"
          alt="particles logo"
        />
        <div className={classes.logoText}>
          <Image
            height={18}
            width={70}
            src="/images/core/logo-mantine-text.svg"
            alt="particles"
          />
        </div>
      </div>
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <div className={classes.menuItemContainer}>
          {HeaderOptions.map((item, index) => (
            <div className={classes.menuItemWrapper} key={index}>
              <Anchor href={item.href} color="dark" target={item.target}>
                <Text size="sm" color="dark">
                  {item.option}
                </Text>
              </Anchor>
            </div>
          ))}

          <div className={classes.menuItemWrapper}>
            {wallet ? (
              <Button
                onClick={() => disconnect()}
                type="button"
                variant="outline"
                color="grape"
                style={{ maxWidth: 180 }}
              >
                <Text size="sm" color="grape" lineClamp={1}>
                  {walletAddress}
                </Text>
              </Button>
            ) : (
              <Button
                onClick={action}
                type="button"
                variant="outline"
                color="grape"
              >
                <Text size="sm" color="grape">
                  Connect Wallet
                </Text>
              </Button>
            )}
          </div>
        </div>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={onClickBurger}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
          style={{ marginRight: 0 }}
        />
      </MediaQuery>
    </header>
  );
};

export default Header;
