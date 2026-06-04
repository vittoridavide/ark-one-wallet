import { useLocalSearchParams } from 'expo-router';

import { PlaceholderScreen } from '@/components/placeholder-screen';

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <PlaceholderScreen title="Transaction" subtitle={id ? `Detail · ${id}` : 'Detail sheet'} />
  );
}
