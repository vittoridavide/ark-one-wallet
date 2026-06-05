import { Redirect } from 'expo-router';

import { useSessionStore, useStoreHydrated } from '@/store';

/**
 * App entry — routes based on session state:
 *   !onboarded → /onboarding · !unlocked → /lock · else → /home
 */
export default function Index() {
  const hydrated = useStoreHydrated(useSessionStore);
  const onboarded = useSessionStore((s) => s.onboarded);
  const unlocked = useSessionStore((s) => s.unlocked);

  // Wait for persisted session to rehydrate before deciding, to avoid a flash.
  if (!hydrated) {
    return null;
  }

  if (!onboarded) {
    return <Redirect href="/onboarding" />;
  }
  if (!unlocked) {
    return <Redirect href="/lock" />;
  }
  return <Redirect href="/home" />;
}
