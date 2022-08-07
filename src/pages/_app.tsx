import "../../styles/globals.css";
import "../../styles/custom.css"; // remove me later when matine is fully integrated

import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as gtag from "../lib/gtag";
import {
  Skeleton,
  Container,
  Space,
  SimpleGrid,
  LoadingOverlay,
} from "@mantine/core";
import dynamic from "next/dynamic";
import { ChakraProvider } from "@chakra-ui/react";
import { useStyles } from "@/styles/components/stakeAssetCard.style";

import AppLayout from "../layouts/AppLayout";

const Providers = dynamic(() => import("../context/bridgesplit/Providers"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathName = router.pathname;

  const [loading, setLoading] = useState(false);

  const { classes } = useStyles();

  const handleRouteChange = (url: URL) => {
    gtag.pageview(url);
    setLoading(false);
  };

  const handleRouteStart = () => {
    setLoading(true);
  };

  useEffect(() => {
    // router.events.on("routeChangeStart", handleRouteStart);
    // router.events.on("routeChangeComplete", handleRouteChange);
    // return () => {
    //   router.events.off("routeChangeStart", handleRouteStart);
    //   router.events.off("routeChangeComplete", handleRouteChange);
    // };

    if (process.env.NODE_ENV === "production") {
      router.events.on("routeChangeStart", handleRouteStart);
      router.events.on("routeChangeComplete", handleRouteChange);
      return () => {
        router.events.off("routeChangeStart", handleRouteStart);
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Particles</title>

        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      {pathName === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Providers>
          <AppLayout>
            {/* {loading ? (
              <Container {...pageProps}>
                <div
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    height: "100%",
                    position: "absolute",
                  }}
                >
                  <LoadingOverlay
                    loaderProps={{ size: "sm", color: "grape" }}
                    visible={loading}
                    transitionDuration={600}
                  />
                </div>
              </Container>
            ) : (
              <Component {...pageProps} />
            )} */}

            <Component {...pageProps} />
          </AppLayout>
        </Providers>
      )}
    </>
  );
}

export default MyApp;
