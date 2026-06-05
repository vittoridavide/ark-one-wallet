import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { createJSONStorage, type PersistStorage } from 'zustand/middleware';

/**
 * Shared persistence backend for zustand `persist` stores. AsyncStorage works
 * across iOS / Android / web (localStorage shim).
 *
 * Note: only persist JSON-serialisable, non-sensitive state here. Wallet runtime
 * state (balances are `bigint`, keys are secret) must NOT use this — it lives in
 * memory and is re-synced, and secrets belong in secure storage.
 */
export function persistStorage<T>(): PersistStorage<T> | undefined {
  return createJSONStorage<T>(() => AsyncStorage);
}

type HydratablePersist = {
  persist: {
    hasHydrated: () => boolean;
    onFinishHydration: (fn: () => void) => () => void;
  };
};

/**
 * React hook that reports whether a persisted store has finished rehydrating
 * from AsyncStorage. Gate state-driven navigation on this to avoid a flash of
 * the default state before the stored value loads.
 */
export function useStoreHydrated(store: HydratablePersist): boolean {
  return useSyncExternalStore(
    (onChange) => store.persist.onFinishHydration(onChange),
    () => store.persist.hasHydrated(),
    () => store.persist.hasHydrated(),
  );
}
