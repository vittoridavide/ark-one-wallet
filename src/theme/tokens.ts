import { Platform } from 'react-native';

/**
 * Ark One design system — foundations.
 *
 * Source of truth: the Claude Design "ark-one-design-system" handoff bundle
 * (`colors_and_type.css` + `README.md`). Dark mode only — there is no light
 * mode. Shipping dark first; light is deferred (see `lightColors` below).
 *
 * Brand: one ecosystem, two audience variants that differ only by accent.
 *   - Ark One · individuals → Signal Turquoise  (#14B8A6) — THIS app.
 *   - Ark One · merchants   → Ember Terracotta   (#B84714).
 * One accent per screen, never both.
 */

// ─── Brand accent families ────────────────────────────────────────────────────
// Each variant carries its full interactive scale plus the ambient/tint values
// used for glows, badge borders, and tinted backgrounds.

export const brand = {
  /** Ark One · for individuals — Signal Turquoise. */
  arkOne: {
    base: '#14B8A6',
    hover: '#0D9488',
    active: '#0B8A7E',
    glow: 'rgba(20,184,166,0.20)',
    tintBg: 'rgba(20,184,166,0.08)',
    tintBorder: 'rgba(20,184,166,0.30)',
  },
  /** Ark One · for merchants — Ember Terracotta. */
  arkMerchant: {
    base: '#B84714',
    hover: '#A33D10',
    active: '#8F360D',
    glow: 'rgba(184,71,20,0.20)',
    tintBg: 'rgba(184,71,20,0.08)',
    tintBorder: 'rgba(184,71,20,0.30)',
  },
} as const;

export type Brand = typeof brand;
export type BrandVariant = keyof Brand;

/** The accent this app ships with. Swap to `brand.arkMerchant` for the POS app. */
const accent = brand.arkOne;

// ─── Semantic colors (dark) ───────────────────────────────────────────────────
// The canonical, full palette. Keys map 1:1 to the design tokens; the inline
// comment is the original `--token` name from `colors_and_type.css`.

export const darkColors = {
  // Surfaces — layered solid neutrals, no gradients.
  background: '#0A0A0B', // --bg — app background, bottom nav
  surface: '#0F0F13', // --surface — cards / panels / sheets / modals / inputs
  surfaceElevated: '#111116', // --surface-elevated — raised cards, dropdowns
  surfaceDeep: '#050507', // --surface-deep — deepest seam, behind the device

  // Borders — white-on-dark, low alpha. (Focus ring = accent at 60%, inputs only.)
  borderSubtle: 'rgba(255,255,255,0.05)', // --border-subtle — default card edge
  borderMid: 'rgba(255,255,255,0.08)', // --border-mid — modals, inputs
  borderStrong: 'rgba(255,255,255,0.10)', // --border-strong — hover / emphasis

  // Text
  textPrimary: '#FFFFFF', // --fg
  textSecondary: '#D4D4D8', // --fg-secondary (zinc-300)
  textMuted: '#A1A1AA', // --fg-muted (zinc-400)
  textSubtle: '#71717A', // --fg-subtle (zinc-500) — also mono / addresses
  textDisabled: '#52525B', // --fg-disabled (zinc-600)
  textOnAccent: '#0A0A0B', // --fg-ondark — text on colored buttons, NEVER white

  // Accent — the active app accent (Ark One turquoise). One per screen.
  accent: accent.base, // --ark-one
  accentHover: accent.hover, // --ark-one-hover
  accentActive: accent.active, // --ark-one-active
  accentGlow: accent.glow, // --ark-one-glow — ambient bloom at 0.20
  accentTintBg: accent.tintBg, // --ark-one-tint-bg — tinted surfaces at 0.08
  accentTintBorder: accent.tintBorder, // --ark-one-tint-border — badge borders at 0.30

  // Semantic — shared across both apps.
  success: '#34D399', // --success (emerald-400) — incoming, confirmed
  warning: '#FBBF24', // --warning (amber-400) — pending, unconfirmed
  error: '#F87171', // --error (red-400) — failures, destructive
  lightning: '#A78BFA', // --lightning (violet-400) — Lightning-only labels
  bitcoin: '#F7931A', // --bitcoin (Bitcoin orange) — on-chain badge dot only
} as const;

export type SemanticColors = typeof darkColors;

/**
 * Light palette — deferred. The design system is dark-only and we ship dark
 * first, so this aliases the dark palette to keep the app fully rendered and
 * type-safe until a real light theme is designed.
 */
export const lightColors: SemanticColors = darkColors;

// ─── Spacing scale ────────────────────────────────────────────────────────────
// 4px base unit. Matches the design's `--s-*` tokens (the numeric key is the
// step; `s-1` = 4px). Common steps: 12 / 16 / 20 / 24 / 32 / 48.

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
} as const;

export type SpacingScale = typeof spacing;
export type SpacingKey = keyof SpacingScale;

// ─── Radii ────────────────────────────────────────────────────────────────────
// Intentional and consistent. `pill` is for status badges / avatars ONLY —
// never buttons.

export const radii = {
  none: 0,
  xs: 8, // --r-xs — small chips, inner glyph holders
  sm: 14, // --r-sm — icon buttons, inline badges
  md: 16, // --r-md — small cards, banner cards
  lg: 20, // --r-lg — inputs, secondary buttons
  xl: 24, // --r-xl — primary buttons, list cards
  '2xl': 32, // --r-2xl — hero cards, sheets, QR container
  '3xl': 40, // --r-3xl — device-edge / app shell mock
  pill: 9999, // --r-pill — status badges, avatar circles only
} as const;

export type Radii = typeof radii;

// ─── Typography ───────────────────────────────────────────────────────────────
// Plus Jakarta Sans (400/500/600/700/800) is the only UI face. JetBrains Mono
// handles addresses, TXIDs, sat amounts, and ₿ values.
//
// NOTE (native): these family names require the fonts to be registered with
// expo-font before they render on iOS/Android — otherwise RN falls back to the
// system face. Web reads them via the CSS vars in `global.css`.

export const fontFamilies = Platform.select({
  ios: {
    sans: 'Plus Jakarta Sans',
    mono: 'JetBrains Mono',
  },
  android: {
    sans: 'Plus Jakarta Sans',
    mono: 'JetBrains Mono',
  },
  web: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  default: {
    sans: 'Plus Jakarta Sans',
    mono: 'JetBrains Mono',
  },
}) as {
  sans: string;
  mono: string;
};

/**
 * Type scale, named by role (display → tiny). Each role has an `Sm` companion
 * where the design specifies a small-screen step.
 */
export const fontSizes = {
  display: 72, // --type-display
  displaySm: 56, // --type-display-sm
  h1: 40, // --type-h1
  h1Sm: 36, // --type-h1-sm
  h2: 28, // --type-h2
  h2Sm: 24, // --type-h2-sm
  h3: 20, // --type-h3
  h3Sm: 18, // --type-h3-sm
  bodyLg: 17, // --type-body-lg
  body: 15, // --type-body
  label: 13, // --type-label
  micro: 12, // --type-micro
  tiny: 11, // --type-tiny
} as const;

export type FontSizes = typeof fontSizes;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800', // used sparingly — hero balance numbers
} as const;

export type FontWeights = typeof fontWeights;

/**
 * Letter spacing / tracking, in **em** (matching the design's `--tr-*` tokens).
 * Web consumes these directly. On native, `letterSpacing` is absolute points —
 * multiply by the font size at the call site (e.g. `tracking.tight * size`).
 */
export const letterSpacing = {
  tighter: -0.03, // --tr-tighter — hero display / balance integers
  tight: -0.015, // --tr-tight — headings
  normal: 0, // --tr-normal
  wide: 0.04, // --tr-wide
  widest: 0.12, // --tr-widest — uppercase micro labels
} as const;

export type LetterSpacing = typeof letterSpacing;

export const lineHeights = {
  tight: 1.1, // --lh-tight — display / h1
  snug: 1.25, // --lh-snug — h2 / h3
  body: 1.45, // --lh-body — body copy
} as const;

export type LineHeights = typeof lineHeights;

export const typography = {
  families: fontFamilies,
  sizes: fontSizes,
  weights: fontWeights,
  letterSpacing,
  lineHeights,
} as const;

export type Typography = typeof typography;

// ─── Elevation / shadows ──────────────────────────────────────────────────────
// Depth comes from solid surfaces + transparency, not drop shadows. The two
// intentional shadows are the primary-CTA glow and the marketing device lift.
// Expressed as React Native shadow style objects.

export const shadows = {
  /** Primary CTA glow — the only shadow on standard surfaces. Accent-tinted. */
  ctaAccent: {
    shadowColor: accent.base,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  /** Merchant primary CTA glow (terracotta). */
  ctaMerchant: {
    shadowColor: brand.arkMerchant.base,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  /** Device-level lift behind the whole phone frame in marketing contexts. */
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.8,
    shadowRadius: 80,
    elevation: 24,
  },
} as const;

export type Shadows = typeof shadows;

// ─── Motion ───────────────────────────────────────────────────────────────────
// Motion is functional — it confirms actions and communicates state.
// Durations in ms. `easing.out` is a CSS bezier (web); on native, map it to an
// Animated `Easing.bezier(0.22, 1, 0.36, 1)`.

export const motion = {
  durations: {
    fast: 80, // --t-fast — press feedback
    base: 200, // --t-base — page slide, fades
    card: 300, // --t-card — hover border / color
    mark: 400, // --t-mark — success check, qr scale
  },
  easing: {
    out: 'cubic-bezier(0.22, 1, 0.36, 1)', // --ease-out
  },
} as const;

export type Motion = typeof motion;
