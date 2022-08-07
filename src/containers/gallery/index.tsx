import React from "react";
import { useSDK } from "@bridgesplit/sdk";
import { useConnectedWallet, useSolana } from "@saberhq/use-solana";
import Image from "next/image";
import {
  ActionIcon,
  Space,
  useMantineTheme,
  Card,
  SimpleGrid,
  Text,
  Transition,
  Modal,
} from "@mantine/core";
import parse from "html-react-parser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LayoutGrid, ChevronLeft, ChevronRight } from "tabler-icons-react";

import PageWrapper from "@/components/Wrappers/PageWrapper";
import PageHeader from "@/components/PageHeader/PageHeader";

import { useStyles } from "@/styles/containers/gallery.style";

import { icons } from "@/constants/icons.constants";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  arrows: false,
  autoplay: false,
  draggable: false,
};

export default function GalleryContainer() {
  const [activeHoverCard, setActiveHoverCard]: any = React.useState(null);
  const [sliderFocus, setSliderFocus]: any = React.useState(null);
  const [opened, setOpened]: any = React.useState(false);

  const sliderEle: any = React.useRef();

  const { classes } = useStyles();
  const wallet = useConnectedWallet();
  const { connection } = useSolana();
  const theme = useMantineTheme();

  useSDK(connection, wallet);

  return (
    <PageWrapper
      PageHeader={() => (
        <PageHeader
          title="Gallery"
          label="FILTER BY"
          radioOptions={[
            { label: "Fractionalized", value: "fractionalized" },
            { label: "Donated", value: "donated" },
          ]}
        />
      )}
      PageAction={() => (
        <Card shadow="md" p="xs" className={classes.cardWrapper}>
          <div style={{ display: "inline-flex" }}>
            <ActionIcon color="grape">
              <LayoutGrid
                color={theme.colors.grape[6]}
                size={theme.spacing.lg}
              />
            </ActionIcon>
            <Space w={theme.spacing.sm} />
            <ActionIcon>{parse(icons.carousel)}</ActionIcon>
            <Space w={theme.spacing.sm} />
            <ActionIcon>{parse(icons.arBox)}</ActionIcon>
          </div>
        </Card>
      )}
    >
      <SimpleGrid
        cols={3}
        spacing="xl"
        breakpoints={[
          { maxWidth: 992, cols: 2, spacing: "lg" },
          { maxWidth: 768, cols: 1, spacing: "lg" },
          { maxWidth: 576, cols: 1, spacing: "lg" },
        ]}
      >
        {[0, 1, 2, 3, 4].map((data, index) => (
          <Card
            key={index}
            shadow="sm"
            p="lg"
            radius="lg"
            onMouseOver={() => setActiveHoverCard(index)}
            onMouseLeave={() => setActiveHoverCard(null)}
            className={classes.contentCard}
            style={{
              transform: activeHoverCard === index ? "scale(1.025)" : "unset",
            }}
            onClick={() => setOpened(true)}
          >
            <Card.Section
              style={{
                height: 292,
                position: "relative",
                borderRadius: theme.spacing.lg,
                cursor: "pointer",
              }}
            >
              <Image
                src="/images/core/nft-art-2.png"
                layout="fill"
                alt="artwork"
                style={{ borderRadius: theme.spacing.lg }}
              />
              <Transition
                mounted={activeHoverCard === index ? true : false}
                transition="fade"
                duration={400}
                timingFunction="ease"
              >
                {(styles) => (
                  <div
                    className={classes.cardContentOverlay}
                    style={{
                      ...styles,
                    }}
                  >
                    <div>
                      <Text
                        style={{ color: theme.colors.gray[0] }}
                        size="lg"
                        weight="bold"
                      >
                        RAH-D - #014
                      </Text>
                      <Text
                        style={{ color: theme.colors.gray[6] }}
                        size="sm"
                        weight="bold"
                      >
                        John Lê Studio
                      </Text>
                    </div>
                    <div>
                      <Text
                        style={{ color: theme.colors.gray[0] }}
                        size="lg"
                        weight="bold"
                      >
                        75
                      </Text>
                      <Text
                        style={{ color: theme.colors.grape[6] }}
                        size="lg"
                        weight="bold"
                      >
                        SOL
                      </Text>
                    </div>
                  </div>
                )}
              </Transition>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        centered
        withinPortal
        transition="fade"
        transitionDuration={400}
        transitionTimingFunction="ease"
        closeOnClickOutside={false}
        styles={{
          modal: { backgroundColor: "transparent" },
          body: {
            maxHeight: "100%",
            overflow: "hidden",
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "calc(100vh - 80px)",
          },
          overlay: {
            overflow: "hidden",
          },
          inner: {
            overflow: "hidden",
            padding: 0 + "px",
          },
        }}
        size="100vw"
        // overflow="inside"
        withCloseButton={false}
        closeOnEscape={true}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={2}
        shadow={""}
      >
        <div className={classes.modalContentContainer}>
          <div className={classes.closeModal} onClick={() => setOpened(false)}>
            {parse(icons.close)}
          </div>
          <div
            className={classes.arrowLeft}
            onClick={() => sliderEle && sliderEle.current.slickPrev()}
          >
            <ChevronLeft color="white" />
          </div>
          <Slider
            ref={(slider) => (sliderEle.current = slider)}
            className={classes.slider}
            {...settings}
          >
            {[0, 1, 2, 3].map((slides, index) => (
              <div
                className={classes.imageWrapper}
                onMouseOver={() => setSliderFocus(index)}
                onMouseLeave={() => setSliderFocus(null)}
              >
                <Image
                  src="/images/core/full-nft-art.png"
                  layout="fill"
                  objectFit="contain"
                />
                <Transition
                  // mounted={sliderFocus === index ? true : false}
                  mounted={false}
                  transition="fade"
                  duration={400}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <div
                      className={classes.cardContentOverlay}
                      style={{
                        ...styles,
                      }}
                    >
                      <div>
                        <Text
                          style={{ color: theme.colors.gray[0] }}
                          size="lg"
                          weight="bold"
                        >
                          RAH-D - #014
                        </Text>
                        <Text
                          style={{ color: theme.colors.gray[6] }}
                          size="sm"
                          weight="bold"
                        >
                          John Lê Studio
                        </Text>
                      </div>
                    </div>
                  )}
                </Transition>
              </div>
            ))}
          </Slider>
          <div
            className={classes.arrowRight}
            onClick={() => sliderEle && sliderEle.current.slickNext()}
          >
            <ChevronRight color="white" />
          </div>
        </div>
      </Modal>
    </PageWrapper>
  );
}
