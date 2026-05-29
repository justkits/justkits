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

export const styles = { pressable, linkButton };
