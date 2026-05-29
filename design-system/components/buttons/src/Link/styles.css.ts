import { style } from "@vanilla-extract/css";
import { mediaQueries } from "@justkits/tokens";

const link = style({
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
});

export const styles = { link };
