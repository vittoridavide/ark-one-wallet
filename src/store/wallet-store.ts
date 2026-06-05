import { create } from 'zustand';

import type { WalletBalance, WalletLoadStatus, WalletSnapshot, WalletTransaction } from '@/domain';
import type { ArkOneWallet } from '@/services/arkone';

export const EMPTY_BALANCE: WalletBalance = {
  spendableSats: 0n,
  pendingInRoundSats: 0n,
  pendingExitSats: 0n,
  pendingLightningSendSats: 0n,
  claimableLightningReceiveSats: 0n,
  pendingBoardSats: 0n,
};

interface WalletState {
  /** Loaded wallet instance. Transient (never persisted). */
  wallet: ArkOneWallet | null;
  status: WalletLoadStatus;
  balance: WalletBalance;
  transactions: WalletTransaction[];
  lastSyncedAt: number | null;
  refreshing: boolean;
  error: string | null;

  setWallet: (wallet: ArkOneWallet | null) => void;
  setStatus: (status: WalletLoadStatus) => void;
  setRefreshing: (refreshing: boolean) => void;
  setError: (error: string | null) => void;
  /** Replace balance + transactions from a fresh sync. */
  applySnapshot: (snapshot: WalletSnapshot) => void;
  reset: () => void;
}

const INITIAL: Pick<
  WalletState,
  'wallet' | 'status' | 'balance' | 'transactions' | 'lastSyncedAt' | 'refreshing' | 'error'
> = {
  wallet: null,
  status: 'idle',
  balance: EMPTY_BALANCE,
  transactions: [],
  lastSyncedAt: null,
  refreshing: false,
  error: null,
};

/**
 * Canonical wallet runtime state — the single source of truth for the loaded
 * wallet, its balance, and transactions. Holds `bigint` sats and secret-bearing
 * objects, so it is in-memory only (never persisted) and re-synced on launch.
 *
 * The `@/features/wallet` hooks drive the services; point them at these setters
 * to make the store authoritative.
 */
export const useWalletStore = create<WalletState>()((set) => ({
  ...INITIAL,
  setWallet: (wallet) => set({ wallet }),
  setStatus: (status) => set({ status }),
  setRefreshing: (refreshing) => set({ refreshing }),
  setError: (error) => set({ error }),
  applySnapshot: (snapshot) =>
    set({
      balance: snapshot.balance,
      transactions: snapshot.transactions,
      lastSyncedAt: Date.now(),
    }),
  reset: () => set(INITIAL),
}));

/** Total owned sats across spendable + all pending buckets. */
export function selectTotalSats(state: Pick<WalletState, 'balance'>): bigint {
  const b = state.balance;
  return (
    b.spendableSats +
    b.pendingInRoundSats +
    b.pendingExitSats +
    b.pendingLightningSendSats +
    b.claimableLightningReceiveSats +
    b.pendingBoardSats
  );
}
