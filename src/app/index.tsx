import { Redirect } from 'expo-router';

/**
 * App entry. Lands on the Home tab for now.
 *
 * TODO: gate on wallet state once it exists — first run → `/onboarding`,
 * locked → `/lock`, unlocked → `/home`.
 */
export default function Index() {
  return <Redirect href="/home" />;
}
