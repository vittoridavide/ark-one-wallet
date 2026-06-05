import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { persistStorage } from './storage';

interface SessionState {
  /** Has the user completed first-run onboarding? Persisted. */
  onboarded: boolean;
  /** Is the wallet currently unlocked? In-memory only — resets every launch. */
  unlocked: boolean;

  completeOnboarding: () => void;
  unlock: () => void;
  lock: () => void;
  /** Wipe session state (e.g. on wallet removal / logout). */
  reset: () => void;
}

/**
 * App session / auth lifecycle. Drives the entry redirect in `app/index.tsx`:
 *   !onboarded → /onboarding · !unlocked → /lock · else → /home
 *
 * `onboarded` is persisted; `unlocked` is intentionally transient so the app
 * always starts locked.
 */
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      onboarded: false,
      unlocked: false,
      completeOnboarding: () => set({ onboarded: true }),
      unlock: () => set({ unlocked: true }),
      lock: () => set({ unlocked: false }),
      reset: () => set({ onboarded: false, unlocked: false }),
    }),
    {
      name: 'ark-one:session',
      storage: persistStorage<SessionState>(),
      // Never persist `unlocked` — re-auth is required on each launch.
      partialize: (s) => ({ onboarded: s.onboarded }) as SessionState,
    },
  ),
);
