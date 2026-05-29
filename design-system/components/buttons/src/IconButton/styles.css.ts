import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@justkits/tokens";

const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing.sm,

    borderRadius: tokens.radius.sm,
    backgroundColor: "transparent",
    transition: "all 0.3s ease",
    selectors: {
      "&[data-disabled]": {
        color: tokens.colors.textDisabled,
        cursor: "not-allowed",
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: tokens.colors.backgroundHover,
            cursor: "pointer",
          },
        },
      },
    },
  },
  variants: {
    ghost: {
      true: {
        backgroundColor: "transparent",
      },
    },
    rounded: {
      true: {
        borderRadius: "50%",
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
});

export const styles = { iconButton };
