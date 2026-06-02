import { Platform } from 'react-native';

// ─── Semantic colors ──────────────────────────────────────────────────────────

export const lightColors = {
  background: '#ffffff',
  surface: '#F0F0F3',
  textPrimary: '#000000',
  textSecondary: '#60646C',
  accent: '#208AEF',
  success: '#22C55E',
  danger: '#EF4444',
  border: '#E0E1E6',
} as const;

export const darkColors = {
  background: '#000000',
  surface: '#212225',
  textPrimary: '#ffffff',
  textSecondary: '#B0B4BA',
  accent: '#208AEF',
  success: '#22C55E',
  danger: '#EF4444',
  border: '#2E3135',
} as const;

export type SemanticColors = typeof lightColors;

// ─── Spacing scale ────────────────────────────────────────────────────────────
// Named by T-shirt / numeric step so it's easy to reason about increments.

export const spacing = {
  px: 1,
  '0.5': 2,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64,
  '20': 80,
  '24': 96,
} as const;

export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;

// ─── Radii ────────────────────────────────────────────────────────────────────

export const radii = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type Radii = typeof radii;

// ─── Typography ───────────────────────────────────────────────────────────────

export const fontFamilies = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
}) as {
  sans: string;
  serif: string;
  rounded: string;
  mono: string;
};

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
  '5xl': 40,
  display: 48,
} as const;

export type FontSizes = typeof fontSizes;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export type FontWeights = typeof fontWeights;

export const lineHeights = {
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.625,
} as const;

export type LineHeights = typeof lineHeights;

export const typography = {
  families: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  lineHeights,
} as const;

export type Typography = typeof typography;
