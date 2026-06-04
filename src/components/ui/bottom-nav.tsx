import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { withAlpha } from './color';
import { Icon, type IconName } from './icon';

import { fontFor, useTheme } from '@/theme';

export interface BottomNavItem {
  key: string;
  label: string;
  icon: IconName;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeKey: string;
  onPress: (key: string) => void;
}

/**
 * Fixed bottom tab bar — translucent app-bg, hairline top border, 5 items.
 * The active item takes the accent; the rest are disabled-grey. Presentational:
 * wire it to a navigator via a `tabBar` adapter.
 */
export function BottomNav({ items, activeKey, onPress }: BottomNavProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: withAlpha(colors.background, 0.92),
          borderTopColor: colors.borderSubtle,
          paddingBottom: Math.max(insets.bottom, 12) + 6,
        },
      ]}
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        const color = active ? colors.accent : colors.textDisabled;
        return (
          <Pressable
            key={item.key}
            onPress={() => onPress(item.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={styles.item}
          >
            <Icon name={item.icon} size={22} color={color} />
            <Text
              style={[fontFor('sans', active ? 'semibold' : 'medium'), styles.label, { color }]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  item: { alignItems: 'center', gap: 4, paddingVertical: 4, paddingHorizontal: 6 },
  label: { fontSize: 11 },
});
