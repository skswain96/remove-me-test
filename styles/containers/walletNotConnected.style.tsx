import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  cardWrapper: {
    width: "100%",
    backgroundColor: theme.colors.gray[1],
    borderRadius: theme.radius.lg,
    height: "100%",
    minHeight: `calc(100vh - 200px)`,
    paddingLeft: `120px !important`,
    paddingRight: `120px !important`,
    paddingTop: `120px !important`,
    paddingBottom: `72px !important`,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-end !important",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      minHeight: `calc(100vh - 90px)`,
      paddingLeft: `90px !important`,
      paddingRight: `90px !important`,
      paddingTop: `90px !important`,
      paddingBottom: `90px !important`,
    },
  },

  noStateContainer: {
    width: "100%",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));
