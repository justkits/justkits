import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/tokens";

export const footer = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    overflow: "hidden",
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.lg} ${tokens.spacing.sm}`,
  },
  variants: {
    collapsed: {
      true: { justifyContent: "center", padding: tokens.spacing.lg },
      false: {},
    },
  },
});

export const expandedSlot = style({
  display: "flex",
  flex: 1,
  alignItems: "center",
  overflow: "hidden",
  transition: "opacity 0.2s ease",
  selectors: {
    "[data-state='collapsed'] &": { opacity: 0, pointerEvents: "none" },
    "[data-state='expanded'] &": { opacity: 1 },
  },
});

export const collapsedSlot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 0.2s ease",
  selectors: {
    "[data-state='collapsed'] &": { opacity: 1 },
    "[data-state='expanded'] &": { opacity: 0, pointerEvents: "none" },
  },
});
