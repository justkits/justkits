import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@justkits/tokens";

const pressable = style({
  whiteSpace: "nowrap",
  selectors: {
    "&:focus-visible": {
      outline: `2px solid ${tokens.colors.primary}`,
    },
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
});

export const styles = { pressable };
