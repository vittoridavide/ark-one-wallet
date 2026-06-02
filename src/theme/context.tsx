import React, { createContext, useContext, useMemo } from 'react';

import {
  brand,
  darkColors,
  lightColors,
  motion,
  radii,
  shadows,
  spacing,
  typography,
} from './tokens';
import type { ColorScheme, Theme } from './types';

// ─── Default theme (dark) ─────────────────────────────────────────────────────
// The Ark One design system is dark-only; we ship dark first.

const darkTheme: Theme = {
  scheme: 'dark',
  colors: darkColors,
  brand,
  spacing,
  radii,
  typography,
  shadows,
  motion,
};

// ─── Context ──────────────────────────────────────────────────────────────────

export const ThemeContext = createContext<Theme>(darkTheme);

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Override the resolved color scheme. Useful in tests and Storybook.
   *
   * Light mode is deferred — its palette currently aliases dark — so without an
   * override the app always renders the dark theme regardless of system setting.
   */
  forcedScheme?: ColorScheme;
}

export function ThemeProvider({ children, forcedScheme }: ThemeProviderProps) {
  const scheme: ColorScheme = forcedScheme ?? 'dark';

  const theme = useMemo<Theme>(
    () => ({
      scheme,
      colors: scheme === 'light' ? lightColors : darkColors,
      brand,
      spacing,
      radii,
      typography,
      shadows,
      motion,
    }),
    [scheme],
  );

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the current typed theme object.
 *
 * @example
 * const { colors, spacing, radii, typography } = useTheme();
 */
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
