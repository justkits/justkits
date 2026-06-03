import { style } from "@vanilla-extract/css";
import { tokens } from "@justkits/tokens";

export const nav = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflowY: "auto",
  padding: `0 ${tokens.spacing.sm}`,
  scrollbarWidth: "thin",
  scrollbarColor: `${tokens.colors.border} transparent`,
});
