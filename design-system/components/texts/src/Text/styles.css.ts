import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const text = recipe({
  variants: {
    variant: {
      hero: { font: tokens.text.hero, color: tokens.colors.primary },
      titleLarge: { font: tokens.text.titleLarge },
      titleMedium: { font: tokens.text.titleMedium },
      titleSmall: { font: tokens.text.titleSmall },
      bodyLarge: { font: tokens.text.bodyLarge },
      bodyMedium: { font: tokens.text.bodyMedium },
      bodySmall: { font: tokens.text.bodySmall },
      description: { font: tokens.text.description },
    },
  },
});

export const styles = { text };
