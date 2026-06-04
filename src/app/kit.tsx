import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AmountKeypad,
  BalanceCard,
  Button,
  Card,
  Icon,
  type IconName,
  IconButton,
  Logo,
  MicroLabel,
  StatusBadge,
  Text,
  TopNav,
  TransactionRow,
  type TransactionRowProps,
} from '@/components/ui';
import { BottomTabInset } from '@/constants/theme';
import { useTheme } from '@/theme';

const TXNS: TransactionRowProps[] = [
  {
    icon: 'coffee',
    label: 'Café Lumière',
    meta: 'Lightning · 9:42 AM',
    method: 'lightning',
    amount: { sign: '-', fiat: '$4.80', sats: '4,800 sats' },
  },
  {
    icon: 'arrow-down-left',
    label: 'ARK received',
    meta: 'On-chain · 8:15 AM',
    method: 'on-chain',
    amount: { sign: '+', fiat: '$120.00', sats: '120,000 sats' },
  },
  {
    icon: 'user',
    label: 'Alice → you',
    meta: 'Transfer · 2:05 PM',
    method: 'transfer',
    amount: { sign: '+', fiat: '$50.00', sats: '50,000 sats' },
  },
  {
    icon: 'shopping-bag',
    label: 'Whole Foods',
    meta: 'NFC · Yesterday',
    method: 'nfc',
    amount: { sign: '-', fiat: '$34.20', sats: '34,200 sats' },
  },
];

const ICONS: IconName[] = [
  'scan-line',
  'qr-code',
  'zap',
  'wifi',
  'bitcoin',
  'shield',
  'refresh-cw',
  'arrow-up-right',
  'arrow-down-left',
  'copy',
  'settings',
  'history',
];

export default function KitShowcaseScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [amount, setAmount] = useState('0');
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + BottomTabInset + 32 },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo size={32} variant="user" />
          <View>
            <Text variant="h2">Component kit</Text>
            <Text variant="label">Ark One · dark</Text>
          </View>
        </View>
        <StatusBadge icon="shield">Self-custody</StatusBadge>
      </View>

      {/* Typography */}
      <Section title="Typography">
        <Card style={styles.stack}>
          <Text variant="display">42</Text>
          <Text variant="h1">Heading one</Text>
          <Text variant="h2">Heading two</Text>
          <Text variant="h3">Heading three</Text>
          <Text variant="bodyLg">Body large — the calm, empowering voice.</Text>
          <Text variant="body">Body — every element earns its place.</Text>
          <Text variant="label">Label · secondary metadata</Text>
          <Text variant="micro">Micro eyebrow</Text>
          <Text variant="mono">bc1q…4f2a · ₿ 0.01240500</Text>
        </Card>
      </Section>

      {/* Balance */}
      <Section title="Balance card">
        <BalanceCard
          label="Spendable balance"
          fiat={hideBalance ? '••••.••' : '1,240.50'}
          btc="₿ 0.01240500"
          trend="+2.4%"
          onToggleVisibility={() => setHideBalance((v) => !v)}
        />
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <View style={styles.row}>
          <Button label="Send" icon="scan-line" style={{ flex: 1 }} />
          <Button label="Receive" variant="secondary" icon="arrow-down-left" style={{ flex: 1 }} />
        </View>
        <Button label="Refresh VTXO" variant="primary" icon="refresh-cw" full />
        <Button label="Cancel" variant="ghost" full />
      </Section>

      {/* Badges */}
      <Section title="Badges & labels">
        <View style={styles.wrap}>
          <StatusBadge icon="zap" color={colors.lightning}>
            Lightning
          </StatusBadge>
          <StatusBadge color={colors.success}>Confirmed</StatusBadge>
          <StatusBadge color={colors.warning}>Pending</StatusBadge>
          <StatusBadge color={colors.error}>Failed</StatusBadge>
        </View>
        <View style={styles.wrap}>
          <MicroLabel>Spendable</MicroLabel>
          <MicroLabel color={colors.bitcoin}>On-chain</MicroLabel>
        </View>
      </Section>

      {/* Icon buttons */}
      <Section title="Icon buttons">
        <View style={styles.wrap}>
          <IconButton name="search" />
          <IconButton name="copy" />
          <IconButton name="refresh-cw" />
          <IconButton name="settings" />
          <IconButton name="x" />
        </View>
      </Section>

      {/* Top nav */}
      <Section title="Top nav">
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <TopNav
            leftIcon="chevron-left"
            title="Confirm payment"
            rightSlot={<StatusBadge color={colors.lightning}>Live</StatusBadge>}
          />
        </Card>
      </Section>

      {/* Transactions */}
      <Section title="Transactions">
        <Card padding={0} style={styles.txnCard}>
          {TXNS.map((t, i) => (
            <View key={t.label}>
              <TransactionRow {...t} onPress={() => {}} />
              {i < TXNS.length - 1 && (
                <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />
              )}
            </View>
          ))}
        </Card>
      </Section>

      {/* Logo variants */}
      <Section title="The Portal">
        <Card style={styles.logoRow}>
          <LogoCell label="user">
            <Logo size={40} variant="user" />
          </LogoCell>
          <LogoCell label="merchant">
            <Logo size={40} variant="merchant" />
          </LogoCell>
          <LogoCell label="combined">
            <Logo size={40} variant="combined" />
          </LogoCell>
        </Card>
      </Section>

      {/* Amount keypad */}
      <Section title="Amount keypad">
        <Card style={styles.stack}>
          <View style={styles.amountDisplay}>
            <Text variant="display" tabular>
              {amount}
            </Text>
            <Text variant="label">sats</Text>
          </View>
          <AmountKeypad value={amount} onChange={setAmount} />
        </Card>
      </Section>

      {/* Icons */}
      <Section title="Icons">
        <Card>
          <View style={styles.wrap}>
            {ICONS.map((name) => (
              <Icon key={name} name={name} size={22} color={colors.textSecondary} />
            ))}
          </View>
        </Card>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text variant="micro" tone="textMuted">
        {title}
      </Text>
      {children}
    </View>
  );
}

function LogoCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.logoCell}>
      {children}
      <Text variant="label">{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 18, gap: 28 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  section: { gap: 12 },
  stack: { gap: 10 },
  row: { flexDirection: 'row', gap: 10 },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  txnCard: { paddingHorizontal: 14 },
  divider: { height: 1 },
  logoRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  logoCell: { alignItems: 'center', gap: 10 },
  amountDisplay: { flexDirection: 'row', alignItems: 'baseline', gap: 8, justifyContent: 'center' },
});
