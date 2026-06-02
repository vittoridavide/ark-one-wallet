import type { darkColors, lightColors, Radii, SpacingScale, Typography } from './tokens';

export type ColorScheme = 'light' | 'dark';

export type SemanticColors = typeof lightColors | typeof darkColors;

export interface Theme {
  scheme: ColorScheme;
  colors: SemanticColors;
  spacing: SpacingScale;
  radii: Radii;
  typography: Typography;
}
