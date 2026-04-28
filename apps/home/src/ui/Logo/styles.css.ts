import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/ui/tokens.css";

const logo = style({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "center",
  gap: tokens.spacing.md,
  color: "currentColor",
  whiteSpace: "nowrap",
});

export const styles = { logo };
