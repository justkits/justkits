import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { tokens } from "@justkits/tokens";

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const header = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    overflow: "hidden",
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.lg} ${tokens.spacing.sm}`,
  },
  variants: {
    variant: {
      expanded: {
        opacity: 1,
        transition: "opacity 150ms ease",
      },
      collapsed: {
        opacity: 0,
        pointerEvents: "none",
      },
      collapsedToIcons: {
        justifyContent: "center",
      },
    },
  },
});

const swapContainer = style({
  display: "grid",
  placeItems: "center",
});

const collapsedIcon = style({
  gridArea: "1 / 1",
  opacity: 1,
  transition: "opacity 200ms ease",
  selectors: {
    [`${swapContainer}:hover &`]: {
      opacity: 0,
      pointerEvents: "none",
    },
  },
});

const toggle = style({
  gridArea: "1 / 1",
  opacity: 0,
  cursor: "pointer",
  pointerEvents: "none",
  animation: `${fadeIn} 200ms ease`,
  animationPlayState: "paused",
  selectors: {
    [`${swapContainer}:hover &`]: {
      opacity: 1,
      pointerEvents: "auto",
      animationPlayState: "running",
    },
  },
});

export const styles = { header, swapContainer, collapsedIcon, toggle };
