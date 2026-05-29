import { style } from "@vanilla-extract/css";
import { mediaQueries, tokens } from "@justkits/tokens";

const textLink = style({
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

export const styles = { textLink };
