import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/tokens";

const badge = style({
  display: "inline-block",
  alignItems: "center",
  justifyContent: "center",
  padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
  gap: tokens.spacing.sm,
  borderRadius: tokens.radius.sm,
  font: tokens.text.description,
});

export const styles = { badge };
