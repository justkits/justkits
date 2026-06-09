import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const EXPANDED_WIDTH = "240px";
const ICON_WIDTH = "56px";

const sidebar = recipe({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto",
    height: "100vh",
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: tokens.colors.surface,
    transition: "width 0.3s ease-in-out",
  },
  variants: {
    appearance: {
      default: {},
      floating: {
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.elevation.lv2,
        margin: tokens.spacing.md,
        height: `calc(100vh - 2 * ${tokens.spacing.md})`,
      },
      inset: {
        height: "100%",
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.colors.border}`,
      },
    },
    collapse: {
      hide: {
        selectors: {
          '&[data-state="expanded"]': { width: EXPANDED_WIDTH },
          '&[data-state="collapsed"]': { width: 0 },
        },
      },
      icons: {
        selectors: {
          '&[data-state="expanded"]': { width: EXPANDED_WIDTH },
          '&[data-state="collapsed"]': { width: ICON_WIDTH },
        },
      },
      disable: {
        width: EXPANDED_WIDTH,
      },
    },
    side: {
      left: {},
      right: {},
    },
  },
  compoundVariants: [
    {
      variants: { appearance: "default", side: "left" },
      style: { borderRight: `1px solid ${tokens.colors.border}` },
    },
    {
      variants: { appearance: "default", side: "right" },
      style: { borderLeft: `1px solid ${tokens.colors.border}` },
    },
  ],
});

export const styles = { sidebar };
