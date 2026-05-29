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

export const styles = { pressable };
