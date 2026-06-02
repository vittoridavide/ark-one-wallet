/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';

// The Ark One design system is dark-only; we ship dark first. Until a light
// theme is designed, the app always renders dark regardless of system setting.
export function useTheme() {
  return Colors.dark;
}
