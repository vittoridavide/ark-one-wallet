import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { fontFor, useTheme } from '@/theme';
import type { SemanticColors } from '@/theme';

/**
 * Semantic type roles, mirroring the design's `.t-*` classes. Each role resolves
 * its size / weight / line-height / tracking / family / default color from the
 * theme tokens — never hardcode font values in screens, use a variant.
 */
export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bodyLg'
  | 'body'
  | 'label'
  | 'micro'
  | 'mono';

type ColorToken = keyof SemanticColors;

interface VariantSpec {
  size: keyof ReturnType<typeof useTheme>['typography']['sizes'];
  weight: keyof ReturnType<typeof useTheme>['typography']['weights'];
  line: keyof ReturnType<typeof useTheme>['typography']['lineHeights'];
  track: keyof ReturnType<typeof useTheme>['typography']['letterSpacing'];
  family: 'sans' | 'mono';
  tone: ColorToken;
  upper?: boolean;
}

const VARIANTS: Record<TextVariant, VariantSpec> = {
  display: {
    size: 'display',
    weight: 'bold',
    line: 'tight',
    track: 'tighter',
    family: 'sans',
    tone: 'textPrimary',
  },
  h1: {
    size: 'h1',
    weight: 'bold',
    line: 'tight',
    track: 'tight',
    family: 'sans',
    tone: 'textPrimary',
  },
  h2: {
    size: 'h2',
    weight: 'semibold',
    line: 'snug',
    track: 'tight',
    family: 'sans',
    tone: 'textPrimary',
  },
  h3: {
    size: 'h3',
    weight: 'semibold',
    line: 'snug',
    track: 'normal',
    family: 'sans',
    tone: 'textPrimary',
  },
  bodyLg: {
    size: 'bodyLg',
    weight: 'regular',
    line: 'body',
    track: 'normal',
    family: 'sans',
    tone: 'textSecondary',
  },
  body: {
    size: 'body',
    weight: 'regular',
    line: 'body',
    track: 'normal',
    family: 'sans',
    tone: 'textSecondary',
  },
  label: {
    size: 'label',
    weight: 'medium',
    line: 'snug',
    track: 'normal',
    family: 'sans',
    tone: 'textMuted',
  },
  micro: {
    size: 'micro',
    weight: 'semibold',
    line: 'tight',
    track: 'widest',
    family: 'sans',
    tone: 'textMuted',
    upper: true,
  },
  mono: {
    size: 'micro',
    weight: 'regular',
    line: 'snug',
    track: 'normal',
    family: 'mono',
    tone: 'textSubtle',
  },
};

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  /** Pick a theme color by token (e.g. `accent`, `success`). Overrides the variant default. */
  tone?: ColorToken;
  /** Raw color override. Wins over `tone`. */
  color?: string;
  /** Render digits with tabular figures so layout doesn't shift. Default true for `mono`. */
  tabular?: boolean;
}

/**
 * Themed text primitive. Use a `variant` for every piece of copy; reach for
 * `tone` / `color` only to recolor.
 *
 * @example
 * <Text variant="h2">Your balance</Text>
 * <Text variant="mono" tone="accent" tabular>₿ 0.01240500</Text>
 */
export function Text({ variant = 'body', tone, color, tabular, style, ...rest }: TextProps) {
  const { colors, typography } = useTheme();
  const spec = VARIANTS[variant];

  const fontSize = typography.sizes[spec.size];
  const resolved: TextStyle = {
    ...fontFor(spec.family, spec.weight),
    fontSize,
    // RN line-height / letter-spacing are absolute points — derive from the em tokens.
    lineHeight: typography.lineHeights[spec.line] * fontSize,
    letterSpacing: typography.letterSpacing[spec.track] * fontSize,
    color: color ?? colors[tone ?? spec.tone],
    ...(spec.upper ? { textTransform: 'uppercase' } : null),
    ...((tabular ?? spec.family === 'mono') ? { fontVariant: ['tabular-nums'] } : null),
  };

  return <RNText style={[resolved, style]} {...rest} />;
}
