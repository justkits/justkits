import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const footer = recipe({
  base: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.lg} ${tokens.spacing.sm}`,
    overflow: "hidden",
  },
  variants: {
    isCollapsedToIcons: {
      true: { justifyContent: "center", padding: tokens.spacing.lg },
      false: {},
    },
  },
});

export const styles = { footer };
