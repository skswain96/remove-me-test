import { WalletKitProvider } from "@gokiprotocol/walletkit";
import { PartialNetworkConfigMap } from "@saberhq/use-solana/dist/cjs/utils/useConnectionInternal";
import { Cluster } from "@solana/web3.js";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import { isDevnet, SdkMiddleware, SdkReducers } from "@bridgesplit/sdk";
import { StakingSDKReducers } from "@bridgesplit/staking-sdk";
import { TokenIconLarge, UiReducers } from "@bridgesplit/ui";
import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

const store = configureStore({
  reducer: {
    ...SdkReducers,
    ...StakingSDKReducers,
    ...UiReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...SdkMiddleware),
});

export const NETWORK_ENDPOINTS: PartialNetworkConfigMap = {
  "mainnet-beta": {
    name: "mainnet-beta",
    endpoint:
      "https://solana-api.syndica.io/access-token/LANUx8RY0Sb29LqRJURARY2LNbeSBjapTjqJf8tNcLXUc4UCDDfZ8HnwNyqW0tQI/rpc",
  },
  devnet: {
    name: "devnet",
    endpoint: "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/",
  },
};

export default function Providers(props: {
  children: React.ReactNode;
}): JSX.Element {
  const DEFAULT_NETWORK: Cluster = isDevnet ? "devnet" : "mainnet-beta";

  return (
    <Provider store={store}>
      <WalletKitProvider
        app={{
          name: "Particles",
          icon: <TokenIconLarge src={"../images/particlesblack.svg"} />,
        }}
        defaultNetwork={DEFAULT_NETWORK}
        networkConfigs={NETWORK_ENDPOINTS}
      >
        <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
      </WalletKitProvider>
    </Provider>
  );
}
