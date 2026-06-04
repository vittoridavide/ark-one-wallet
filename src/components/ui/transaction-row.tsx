import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Icon, type IconName } from './icon';

import { fontFor, useTheme } from '@/theme';

export type PaymentMethod = 'lightning' | 'on-chain' | 'nfc' | 'ark' | 'transfer';

export interface TransactionAmount {
  /** '+' for incoming, '-' for outgoing. */
  sign: '+' | '-';
  /** Fiat string, e.g. "$4.80". */
  fiat: string;
  /** Sats string (mono), e.g. "4,800 sats". */
  sats: string;
}

export interface TransactionRowProps {
  /** Category glyph in the avatar. */
  icon: IconName;
  label: string;
  meta: string;
  method: PaymentMethod;
  amount: TransactionAmount;
  /** Accent used for incoming amounts (defaults to app accent). */
  accent?: string;
  onPress?: () => void;
}

/**
 * One payment row: avatar with a method dot, label + meta, and a right-aligned
 * fiat / sats pair. Incoming amounts use the accent; outgoing stay white.
 */
export function TransactionRow({
  icon,
  label,
  meta,
  method,
  amount,
  accent,
  onPress,
}: TransactionRowProps) {
  const { colors } = useTheme();

  const methodMap: Record<PaymentMethod, { color: string; icon?: IconName; char?: string }> = {
    lightning: { color: colors.lightning, icon: 'zap' },
    'on-chain': { color: colors.bitcoin, char: '₿' },
    nfc: { color: colors.accent, icon: 'wifi' },
    ark: { color: colors.accent, char: '↯' },
    transfer: { color: colors.accent, icon: 'user' },
  };
  const m = methodMap[method];

  const isIncoming = amount.sign === '+';
  const amountColor = isIncoming ? (accent ?? colors.accent) : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && onPress ? { opacity: 0.6 } : null]}
    >
      <View style={styles.left}>
        <View
          style={[
            styles.avatar,
            { backgroundColor: colors.background, borderColor: colors.borderStrong },
          ]}
        >
          <Icon name={icon} size={20} color={colors.textMuted} />
          <View style={[styles.dot, { backgroundColor: m.color, borderColor: colors.surface }]}>
            {m.icon ? (
              <Icon name={m.icon} size={9} color={colors.textOnAccent} />
            ) : (
              <Text style={{ ...fontFor('sans', 'bold'), fontSize: 9, color: colors.textOnAccent }}>
                {m.char}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.labels}>
          <Text style={{ ...fontFor('sans', 'semibold'), fontSize: 15, color: colors.textPrimary }}>
            {label}
          </Text>
          <Text style={{ ...fontFor('sans', 'medium'), fontSize: 12, color: colors.textSubtle }}>
            {meta}
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text
          style={{
            ...fontFor('sans', 'semibold'),
            fontSize: 15,
            color: amountColor,
            fontVariant: ['tabular-nums'],
          }}
        >
          {amount.sign}
          {amount.fiat}
        </Text>
        <Text
          style={{
            ...fontFor('mono', 'regular'),
            fontSize: 12,
            color: colors.textSubtle,
            fontVariant: ['tabular-nums'],
          }}
        >
          {amount.sats}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 1 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: { gap: 3, flexShrink: 1 },
  right: { alignItems: 'flex-end', gap: 3 },
});
