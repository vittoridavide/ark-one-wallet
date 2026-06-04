import type { ReactNode } from 'react';
import { type StyleProp, StyleSheet, View, type ViewStyle } from 'react-native';
import { type Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

export interface ScreenProps {
  children: ReactNode;
  /** Safe-area edges to inset. Defaults to top + bottom. */
  edges?: readonly Edge[];
  /** Horizontal page padding in px (design content gutter is ~18–20). */
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Page shell — fills the screen with the app background and applies safe-area
 * insets. The base container every screen sits in.
 */
export function Screen({
  children,
  edges = ['top', 'bottom'],
  padded = false,
  style,
}: ScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={edges} style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={[styles.body, padded && styles.padded, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1 },
  padded: { paddingHorizontal: 18 },
});
