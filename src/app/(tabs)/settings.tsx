import { useRouter } from 'expo-router';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { useSessionStore } from '@/store';

export default function SettingsScreen() {
  const router = useRouter();
  const lock = useSessionStore((s) => s.lock);

  return (
    <PlaceholderScreen
      title="Settings"
      subtitle="Tab · security & backup"
      edges={['top']}
      actionLabel="Lock wallet"
      onAction={() => {
        lock();
        router.replace('/');
      }}
    />
  );
}
