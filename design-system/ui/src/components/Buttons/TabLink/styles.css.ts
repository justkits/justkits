import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const label = recipe({
  variants: {
    isActive: {
      true: {
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },
  },
});

export const styles = { label };
