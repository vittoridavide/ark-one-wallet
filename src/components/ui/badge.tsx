import { type ColorValue, StyleSheet, Text, View } from 'react-native';

import { withAlpha } from './color';
import { Icon, type IconName } from './icon';

import { fontFor, useTheme } from '@/theme';

export interface StatusBadgeProps {
  children: string;
  /** Pill color. Defaults to the app accent. Tint bg / border are derived from it. */
  color?: string;
  icon?: IconName;
}

/**
 * Status pill — Self-custody, Live, Confirmed, Pending, … A single color drives
 * the text, a 10% tint background, and a 30% border.
 */
export function StatusBadge({ children, color, icon }: StatusBadgeProps) {
  const { colors, typography } = useTheme();
  const c = color ?? colors.accent;

  return (
    <View
      style={[styles.pill, { backgroundColor: withAlpha(c, 0.1), borderColor: withAlpha(c, 0.3) }]}
    >
      {icon && <Icon name={icon} size={12} color={c} />}
      <Text
        style={{
          ...fontFor('sans', 'bold'),
          fontSize: typography.sizes.micro,
          color: c as ColorValue,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export interface MicroLabelProps {
  children: string;
  color?: string;
}

/**
 * Uppercase eyebrow label that sits above hero cards and section groups.
 */
export function MicroLabel({ children, color }: MicroLabelProps) {
  const { colors } = useTheme();
  const c = color ?? colors.accent;

  return (
    <View
      style={[
        styles.microPill,
        { backgroundColor: withAlpha(c, 0.1), borderColor: withAlpha(c, 0.3) },
      ]}
    >
      <Text
        style={{
          ...fontFor('sans', 'bold'),
          fontSize: 10,
          letterSpacing: 1.8,
          textTransform: 'uppercase',
          color: c as ColorValue,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  microPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});
