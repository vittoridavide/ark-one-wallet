/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  // Ark One design system — dark only, shipping dark first.
  dark: {
    text: '#FFFFFF', // --fg
    background: '#0A0A0B', // --bg
    backgroundElement: '#0F0F13', // --surface
    backgroundSelected: '#111116', // --surface-elevated
    textSecondary: '#A1A1AA', // --fg-muted
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// Ark One brand faces. Native names require expo-font registration to render;
// otherwise RN falls back to the system face. Web reads them from `global.css`.
export const Fonts = Platform.select({
  ios: {
    sans: 'Plus Jakarta Sans',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'JetBrains Mono',
  },
  default: {
    sans: 'Plus Jakarta Sans',
    serif: 'serif',
    rounded: 'normal',
    mono: 'JetBrains Mono',
  },
  web: {
    sans: 'var(--font-sans)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
