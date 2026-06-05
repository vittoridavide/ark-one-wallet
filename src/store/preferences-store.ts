import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { persistStorage } from './storage';

/** ISO 4217 currency code used to display fiat equivalents. */
export type FiatCurrency = 'USD' | 'EUR' | 'GBP';

interface PreferencesState {
  /** Hide balance figures behind a mask (the eye toggle on the balance card). */
  balanceHidden: boolean;
  /** Currency for fiat equivalents shown alongside sats/BTC. */
  fiatCurrency: FiatCurrency;

  toggleBalanceHidden: () => void;
  setBalanceHidden: (hidden: boolean) => void;
  setFiatCurrency: (currency: FiatCurrency) => void;
  reset: () => void;
}

const INITIAL: Pick<PreferencesState, 'balanceHidden' | 'fiatCurrency'> = {
  balanceHidden: false,
  fiatCurrency: 'USD',
};

/**
 * User-facing display preferences. Persisted across launches.
 */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...INITIAL,
      toggleBalanceHidden: () => set((s) => ({ balanceHidden: !s.balanceHidden })),
      setBalanceHidden: (balanceHidden) => set({ balanceHidden }),
      setFiatCurrency: (fiatCurrency) => set({ fiatCurrency }),
      reset: () => set(INITIAL),
    }),
    {
      name: 'ark-one:preferences',
      storage: persistStorage<PreferencesState>(),
      partialize: (s) =>
        ({ balanceHidden: s.balanceHidden, fiatCurrency: s.fiatCurrency }) as PreferencesState,
    },
  ),
);
