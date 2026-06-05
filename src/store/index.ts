// Zustand state layer.
//
//  • wallet-store      — in-memory wallet runtime state (balance, txns, status).
//  • preferences-store — persisted display preferences.
//  • session-store     — auth lifecycle (onboarded / unlocked); drives entry routing.

export { persistStorage, useStoreHydrated } from './storage';

export { EMPTY_BALANCE, selectTotalSats, useWalletStore } from './wallet-store';

export { usePreferencesStore } from './preferences-store';
export type { FiatCurrency } from './preferences-store';

export { useSessionStore } from './session-store';
