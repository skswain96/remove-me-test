import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  cardContentContainer: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "flex-center",
    padding: `${theme.spacing.md}px`,
    paddingBottom: `${theme.spacing.sm}px`,
  },
  cardActionContainer: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "flex-center",
    padding: `${theme.spacing.md}px`,
    paddingTop: 0,
  },
  textContainer: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  textContent: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    minWidth: 62,
  },
  textWrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));
