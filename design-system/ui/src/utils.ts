import { createSimpleBreakpointQueries } from "@justkits/tokens";

export { colorWithOpacity } from "@justkits/tokens";

export const media = {
  breakpoints: createSimpleBreakpointQueries({
    sm: "768px",
    lg: "1280px",
  }),
  hoverable: "(hover: hover) and (pointer: fine)",
};
