import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon } from './icon';

import { fontFor, useTheme } from '@/theme';

export interface AmountKeypadProps {
  value: string;
  onChange: (next: string) => void;
  /** Max number of characters in the value. */
  max?: number;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'] as const;

/**
 * Full-width 3×4 numeric keypad. Owns its edit rules (single decimal point,
 * leading-zero replace, backspace) and calls `onChange` with the next value.
 */
export function AmountKeypad({ value, onChange, max = 12 }: AmountKeypadProps) {
  const { colors, radii } = useTheme();

  function press(k: (typeof KEYS)[number]) {
    if (k === 'back') return onChange(value.slice(0, -1) || '0');
    if (k === '.' && value.includes('.')) return;
    if (value.length >= max) return;
    if (value === '0' && k !== '.') return onChange(k);
    onChange(value + k);
  }

  return (
    <View style={styles.grid}>
      {KEYS.map((k) => (
        <Pressable
          key={k}
          onPress={() => press(k)}
          style={({ pressed }) => [
            styles.key,
            { backgroundColor: colors.surface, borderRadius: radii.md },
            pressed && styles.pressed,
          ]}
        >
          {k === 'back' ? (
            <Icon name="delete" size={20} color={colors.textMuted} />
          ) : (
            <Text
              style={{ ...fontFor('sans', 'semibold'), fontSize: 22, color: colors.textPrimary }}
            >
              {k}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 8 },
  key: {
    width: '31.5%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.85 },
});
