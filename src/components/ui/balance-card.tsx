import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { withAlpha } from './color';
import { Icon } from './icon';
import { MicroLabel } from './badge';

import { fontFor, useTheme } from '@/theme';

export interface BalanceCardProps {
  /** Eyebrow label, e.g. "Spendable balance". */
  label: string;
  /** Fiat amount as a string with a single decimal point, e.g. "1,240.50". */
  fiat: string;
  /** Bitcoin equivalent (mono), e.g. "₿ 0.01240500". */
  btc: string;
  /** Optional trend chip, e.g. "+2.4%". */
  trend?: string;
  /** Accent override (defaults to the app accent). */
  accent?: string;
  /** Show the visibility toggle button. */
  eyeButton?: boolean;
  onToggleVisibility?: () => void;
}

/**
 * Hero balance card with a single ambient accent bloom (rendered as an SVG
 * radial gradient so it's soft on native without a blur dependency).
 *
 * The amount pairs three weights on one line: `$` muted, integer white 800,
 * decimals secondary — all tabular so the layout never shifts.
 */
export function BalanceCard({
  label,
  fiat,
  btc,
  trend,
  accent,
  eyeButton = true,
  onToggleVisibility,
}: BalanceCardProps) {
  const { colors, radii } = useTheme();
  const c = accent ?? colors.accent;
  const [int, dec] = fiat.split('.');

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
          borderRadius: radii.xl,
        },
      ]}
    >
      {/* Ambient bloom, top-right */}
      <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <RadialGradient id="glow" cx="100%" cy="0%" r="70%">
            <Stop offset="0" stopColor={c} stopOpacity={0.22} />
            <Stop offset="1" stopColor={c} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#glow)" />
      </Svg>

      <View>
        <View style={styles.topRow}>
          <MicroLabel color={c}>{label}</MicroLabel>
          {eyeButton && (
            <Pressable
              onPress={onToggleVisibility}
              hitSlop={8}
              style={[
                styles.eyeBtn,
                { backgroundColor: withAlpha('#FFFFFF', 0.05), borderColor: colors.borderSubtle },
              ]}
            >
              <Icon name="eye" size={16} color={colors.textMuted} />
            </Pressable>
          )}
        </View>

        <View style={styles.amountRow}>
          <Text style={[styles.sym, fontFor('sans', 'semibold'), { color: colors.textMuted }]}>
            $
          </Text>
          <Text style={[styles.int, fontFor('sans', 'extrabold'), { color: colors.textPrimary }]}>
            {int}
          </Text>
          {dec !== undefined && (
            <Text style={[styles.dec, fontFor('sans', 'bold'), { color: colors.textSecondary }]}>
              .{dec}
            </Text>
          )}
        </View>

        <View style={styles.metaRow}>
          <Text
            style={{
              ...fontFor('mono', 'regular'),
              fontSize: 13,
              color: c,
              fontVariant: ['tabular-nums'],
            }}
          >
            {btc}
          </Text>
          {trend && (
            <View style={styles.trend}>
              <Icon name="trending-up" size={12} color={colors.success} />
              <Text style={{ ...fontFor('sans', 'semibold'), fontSize: 12, color: colors.success }}>
                {trend}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { position: 'relative', overflow: 'hidden', borderWidth: 1, padding: 22 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyeBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, marginTop: 12 },
  sym: { fontSize: 22, marginBottom: 8 },
  int: { fontSize: 44, letterSpacing: -1.3 },
  dec: { fontSize: 22, marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  trend: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
