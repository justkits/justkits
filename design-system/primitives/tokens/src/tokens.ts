import type { SemanticColors } from "@justkits/colors";

import { colorTokens } from "./models/colors";
import { elevationTokens, type ElevationTokens } from "./models/elevation";
import { radiusTokens, type RadiusTokens } from "./models/radius";
import { spacingTokens, type SpacingTokens } from "./models/spacing";
import { textTokens, type TextTokens } from "./models/text";
import { typographyTokens, type TypographyTokens } from "./models/typography";

export type DesignTokens = {
  colors: SemanticColors;
  elevation: ElevationTokens;
  radius: RadiusTokens;
  spacing: SpacingTokens;
  text: TextTokens;
  typography: TypographyTokens;
};

export const tokens: DesignTokens = {
  colors: { ...colorTokens },
  elevation: { ...elevationTokens },
  radius: { ...radiusTokens },
  spacing: { ...spacingTokens },
  text: { ...textTokens },
  typography: { ...typographyTokens },
};
