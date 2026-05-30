import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { mediaQueries, tokens } from "@justkits/tokens";

const pressable = recipe({
  base: {
    whiteSpace: "nowrap",
    selectors: {
      "&[data-disabled]": {
        cursor: "not-allowed",
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not([data-disabled]):hover": {
            cursor: "pointer",
          },
        },
      },
    },
  },
  variants: {
    type: {
      button: {
        selectors: {
          "&:focus-visible": {
            outline: `2px solid ${tokens.colors.primary}`,
          },
        },
      },
      link: {},
    },
  },
});

const linkButton = style({
  color: tokens.colors.primary,
  selectors: {
    "&:focus-visible": {
      outline: "none",
      textDecoration: "underline",
    },
  },
  "@media": {
    [mediaQueries.hoverable]: {
      selectors: {
        "&:not([data-disabled]):hover": {
          textDecoration: "underline",
        },
      },
    },
  },
});

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
      },
    },
    "@media": {
      [mediaQueries.hoverable]: {
        selectors: {
          "&:not(:disabled):hover": {
            backgroundColor: tokens.colors.backgroundHover,
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
        borderRadius: tokens.radius.full,
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
  },
});

export const styles = { pressable, linkButton, iconButton };
