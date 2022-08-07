import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  MantineProvider,
  AppShell,
  Navbar,
  Header as HeaderWrapper,
  Footer,
  useMantineTheme,
} from "@mantine/core";
import { useWalletKit } from "@gokiprotocol/walletkit";

// import components
import Header from "@/components/Header/Header";
import SideNavBar from "@/components/SideNavBar/SideNavBar";

const AppLayout: React.FC = ({ children }) => {
  const { connect } = useWalletKit();
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();

  const handleNavigation = (path: string) => {
    router.replace(path);
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          white: ["#FFFFFF"],
        },
      }}
    >
      <AppShell
        navbarOffsetBreakpoint="md"
        asideOffsetBreakpoint="md"
        fixed
        padding="sm"
        zIndex={0}
        navbar={
          <Navbar
            width={{ base: 300 }}
            p="md"
            hiddenBreakpoint="md"
            hidden={!opened}
            fixed={true}
            position={{
              bottom: 0,
            }}
          >
            <SideNavBar action={handleNavigation} />
          </Navbar>
        }
        header={
          <HeaderWrapper height={60} p="md">
            <Header
              action={connect}
              opened={opened}
              onClickBurger={() => setOpened((o) => !o)}
            />
          </HeaderWrapper>
        }
        // footer={
        //   <Footer
        //     height={60}
        //     style={
        //       {
        //         // width: "100%",
        //       }
        //     }
        //     p="md"
        //     color="gray"
        //     fixed={false}
        //     position={{
        //       bottom: 0,
        //       right: 0,
        //     }}
        //   >
        //     Application footer
        //   </Footer>
        // }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
            [`@media (max-width: ${theme.breakpoints.md}px)`]: {
              paddingLeft: 12,
            },
          },
        })}
      >
        {children}
      </AppShell>
    </MantineProvider>
  );
};

export default AppLayout;
