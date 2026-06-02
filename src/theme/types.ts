import type {
  Brand,
  Motion,
  Radii,
  SemanticColors,
  Shadows,
  SpacingScale,
  Typography,
} from './tokens';

export type ColorScheme = 'light' | 'dark';

export type { SemanticColors } from './tokens';

export interface Theme {
  scheme: ColorScheme;
  colors: SemanticColors;
  /** Both brand accent families (arkOne / arkMerchant), independent of `colors.accent`. */
  brand: Brand;
  spacing: SpacingScale;
  radii: Radii;
  typography: Typography;
  shadows: Shadows;
  motion: Motion;
}
