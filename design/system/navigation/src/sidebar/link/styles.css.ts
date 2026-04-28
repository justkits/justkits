import { style } from "@vanilla-extract/css";

const wrapper = style({
  display: "grid",
  gridTemplateColumns: "24px 1fr auto",
  alignItems: "center",
  position: "relative",
  transition: "all 0.3s ease",
});

const link = style({
  position: "absolute",
  inset: 0,
  padding: 0,
});

export const styles = { wrapper, link };
