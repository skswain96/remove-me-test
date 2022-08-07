import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  cardContentContainer: {
    width: "100%",
    display: `inline-flex`,
    justifyContent: "space-between",
    alignItems: "center",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column",
    },
  },
  cardWrapper: {
    width: "100%",
  },
  quickInfoContainer: {
    width: "100%",
    display: `inline-flex`,
    justifyContent: "space-between",
    alignItems: "center",
  },

  radioWrapper: {
    marginTop: `${theme.spacing.sm}px`,
  },

  infoStatContainer: {
    width: "100%",
    display: `inline-flex`,
    alignItems: "flex-start",
  },

  infoStats: {
    display: `inline-flex`,
    flexDirection: "column",
    alignItems: "flex-start",
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    width: "auto",

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    },
  },

  label: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 9,
    },
  },

  borderRight: {
    borderRight: `1px solid ${theme.colors.gray[2]}`,
  },

  infoTextContainer: {
    display: `inline-flex`,
    alignItems: "center",
  },

  actionContainer: {
    display: `inline-flex`,
    alignItems: "center",
    paddingRight: `${theme.spacing.md}px`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      marginTop: `${theme.spacing.sm}px`,
    },
  },
}));
