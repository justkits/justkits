// Token interfaces
export type { SemanticColors as ColorTokens } from "@justkits/colors";
export type { ElevationTokens } from "./models/elevation";
export type { RadiusTokens } from "./models/radius";
export type { SpacingTokens } from "./models/spacing";
export type { TextTokens } from "./models/text";
export type { TypographyTokens } from "./models/typography";

export type { DesignTokens } from "./tokens";

// Other types
export type { ThemeInput } from "./utils/buildCssVariables";
export type {
  BreakpointQueries,
  SimpleBreakpointQueries,
} from "./utils/breakpoint-queries";

// Utility functions
export { buildCssVariables, defaultCss } from "./utils/buildCssVariables";
export { applyTokens } from "./utils/applyTokens";
export {
  createSimpleBreakpointQueries,
  createBreakpointQueries,
} from "./utils/breakpoint-queries";
// re-export utility functions from the colors package
export { colorWithOpacity, convertToLightDark } from "@justkits/colors";

// Token constant (default)
export { tokens, mediaQueries } from "./tokens";
