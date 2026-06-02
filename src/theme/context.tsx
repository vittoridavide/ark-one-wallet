import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { darkColors, lightColors, radii, spacing, typography } from './tokens';
import type { ColorScheme, Theme } from './types';

// ─── Default theme (light) ────────────────────────────────────────────────────

const defaultTheme: Theme = {
  scheme: 'light',
  colors: lightColors,
  spacing,
  radii,
  typography,
};

// ─── Context ──────────────────────────────────────────────────────────────────

export const ThemeContext = createContext<Theme>(defaultTheme);

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Override the detected color scheme. Useful in tests and Storybook. */
  forcedScheme?: ColorScheme;
}

export function ThemeProvider({ children, forcedScheme }: ThemeProviderProps) {
  const systemScheme = useColorScheme();

  const scheme: ColorScheme =
    forcedScheme ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const theme = useMemo<Theme>(
    () => ({
      scheme,
      colors: scheme === 'dark' ? darkColors : lightColors,
      spacing,
      radii,
      typography,
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
