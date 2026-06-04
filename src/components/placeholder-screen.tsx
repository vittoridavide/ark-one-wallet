import type { Edge } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

import { Screen, Text } from '@/components/ui';

interface PlaceholderScreenProps {
  title: string;
  /** Short note under the title, e.g. the flow it belongs to. */
  subtitle?: string;
  edges?: readonly Edge[];
}

/**
 * Temporary blank screen used while the navigation structure is wired ahead of
 * the real screens. Centers the route name on the app background.
 */
export function PlaceholderScreen({
  title,
  subtitle = 'Screen placeholder',
  edges,
}: PlaceholderScreenProps) {
  return (
    <Screen edges={edges}>
      <View style={styles.center}>
        <Text variant="h2">{title}</Text>
        <Text variant="label">{subtitle}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
});
