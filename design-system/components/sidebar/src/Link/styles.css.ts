import { style } from "@vanilla-extract/css";

const link = style({
  position: "relative",
  cursor: "pointer",
  userSelect: "none",
});

const linkOverlay = style({
  position: "absolute",
  inset: 0,
  borderRadius: "inherit",
  zIndex: 0,
});

export const styles = { link, linkOverlay };
