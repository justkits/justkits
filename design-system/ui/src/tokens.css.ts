import { createGlobalThemeContract } from "@vanilla-extract/css";
import {
  colorCssVariables,
  elevationCssVariables,
  radiusCssVariables,
  spacingCssVariables,
  textCssVariables,
  typographyCssVariables,
} from "@justkits/tokens";

export const tokens = createGlobalThemeContract({
  colors: { ...colorCssVariables },
  elevation: { ...elevationCssVariables },
  font: { ...textCssVariables },
  typography: { ...typographyCssVariables },
  radius: { ...radiusCssVariables },
  spacing: { ...spacingCssVariables },
});
