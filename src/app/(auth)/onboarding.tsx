import { Redirect } from 'expo-router';

import { PlaceholderScreen } from '@/components/placeholder-screen';
import { useSessionStore } from '@/store';

export default function OnboardingScreen() {
  const onboarded = useSessionStore((s) => s.onboarded);
  const completeOnboarding = useSessionStore((s) => s.completeOnboarding);

  if (onboarded) {
    return <Redirect href="/lock" />;
  }

  return (
    <PlaceholderScreen
      title="Onboarding"
      subtitle="Auth · welcome & setup"
      actionLabel="Get started"
      onAction={completeOnboarding}
    />
  );
}
