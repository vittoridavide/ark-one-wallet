import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IconButton } from './icon-button';
import type { IconName } from './icon';

import { fontFor, useTheme } from '@/theme';
import { withAlpha } from './color';

export interface TopNavProps {
  leftIcon?: IconName;
  onLeft?: () => void;
  title?: string;
  rightIcon?: IconName;
  onRight?: () => void;
  /** Custom right-side content (e.g. a StatusBadge), placed before `rightIcon`. */
  rightSlot?: ReactNode;
}

/**
 * Fixed 56px top bar — translucent app-bg with a hairline bottom border.
 * Wrap it under a safe-area top inset (the `Screen` component handles that).
 */
export function TopNav({ leftIcon, onLeft, title, rightIcon, onRight, rightSlot }: TopNavProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: withAlpha(colors.background, 0.9),
          borderBottomColor: colors.borderSubtle,
        },
      ]}
    >
      <View style={styles.side}>
        {leftIcon && <IconButton name={leftIcon} onPress={onLeft} />}
        {title && (
          <Text style={{ ...fontFor('sans', 'semibold'), fontSize: 16, color: colors.textPrimary }}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.side}>
        {rightSlot}
        {rightIcon && <IconButton name={rightIcon} onPress={onRight} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  side: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});
