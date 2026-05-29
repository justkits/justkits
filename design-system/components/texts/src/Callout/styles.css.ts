import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorWithOpacity, tokens } from "@justkits/tokens";

const callout = recipe({
  base: {
    display: "grid",
    gap: tokens.spacing.sm,
  },
  variants: {
    variant: {
      info: {
        color: tokens.colors.info,
        backgroundColor: colorWithOpacity(tokens.colors.info, 20),
      },
      warning: {
        color: tokens.colors.warning,
        backgroundColor: colorWithOpacity(tokens.colors.warning, 20),
      },
      error: {
        color: tokens.colors.error,
        backgroundColor: colorWithOpacity(tokens.colors.error, 20),
      },
      success: {
        color: tokens.colors.success,
        backgroundColor: colorWithOpacity(tokens.colors.success, 20),
      },
      note: {
        color: tokens.colors.text,
        backgroundColor: colorWithOpacity(tokens.colors.text, 20),
      },
    },
    size: {
      small: {
        gridTemplateColumns: "1.5rem 1fr",
      },
      medium: {
        gridTemplateColumns: "2rem 1fr",
      },
      large: {
        gridTemplateColumns: "2.5rem 1fr",
      },
    },
  },
});

const icon = style({
  gridArea: "1 / 1",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
});

const title = style({
  gridArea: "1 / 2",
});

const main = style({
  gridArea: "2 / 2",
});

export const styles = { callout, icon, title, main };
