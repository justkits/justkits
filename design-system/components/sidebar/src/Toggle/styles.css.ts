import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/tokens";

const toggle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: tokens.spacing.sm,
  borderRadius: tokens.radius.md,
  color: tokens.colors.textMuted,
  selectors: {
    "&:hover": {
      backgroundColor: tokens.colors.backgroundHover,
      color: tokens.colors.text,
    },
  },
});

const sidebarIcon = style({
  display: "flex",
  selectors: {
    [`${toggle}:hover &`]: { display: "none" },
  },
});

const arrowIcon = style({
  display: "none",
  transition: "transform 0.2s ease",
  selectors: {
    [`${toggle}:hover &`]: { display: "flex" },
    [`${toggle}[data-side="left"][data-expanded="true"] &`]: {
      transform: "scaleX(-1)",
    },
    [`${toggle}[data-side="right"][data-expanded="false"] &`]: {
      transform: "scaleX(-1)",
    },
  },
});

export const styles = { toggle, sidebarIcon, arrowIcon };
