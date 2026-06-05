import { Redirect } from 'expo-router';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { useSessionStore } from '@/store';

export default function LockScreen() {
  const unlocked = useSessionStore((s) => s.unlocked);
  const unlock = useSessionStore((s) => s.unlock);

  if (unlocked) {
    return <Redirect href="/home" />;
  }

  return (
    <PlaceholderScreen
      title="Lock"
      subtitle="Auth · PIN / biometric"
      actionLabel="Unlock"
      onAction={unlock}
    />
  );
}
