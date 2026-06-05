import { useCallback, useEffect, useRef, useState } from 'react';

import type { WalletBalance, WalletSnapshot, WalletTransaction } from '@/domain';
import {
  getBarkErrorMessage,
  subscribeToWalletNotifications,
  syncWallet,
  type ArkOneWallet,
} from '@/services/arkone';

const EMPTY_BALANCE: WalletBalance = {
  spendableSats: 0n,
  pendingInRoundSats: 0n,
  pendingExitSats: 0n,
  pendingLightningSendSats: 0n,
  claimableLightningReceiveSats: 0n,
  pendingBoardSats: 0n,
};

type UseWalletSyncOptions = {
  onMovementCreated?: (transaction: WalletTransaction) => void;
};

export function useWalletSync(wallet: ArkOneWallet | null, options?: UseWalletSyncOptions) {
  const [snapshot, setSnapshot] = useState<WalletSnapshot>({
    balance: EMPTY_BALANCE,
    transactions: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const onMovementCreatedRef = useRef(options?.onMovementCreated);

  useEffect(() => {
    onMovementCreatedRef.current = options?.onMovementCreated;
  }, [options?.onMovementCreated]);

  const refresh = useCallback(async () => {
    if (!wallet) {
      return null;
    }

    setRefreshing(true);
    setError(null);

    try {
      const nextSnapshot = await syncWallet(wallet);
      setSnapshot(nextSnapshot);
      setLastSyncedAt(Date.now());
      return nextSnapshot;
    } catch (err) {
      const message = getBarkErrorMessage(err);
      setError(message);
      return null;
    } finally {
      setRefreshing(false);
    }
  }, [wallet]);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    const currentWallet = wallet;

    async function syncInitialWallet() {
      try {
        const nextSnapshot = await syncWallet(currentWallet);
        setSnapshot(nextSnapshot);
        setLastSyncedAt(Date.now());
      } catch (err) {
        setError(getBarkErrorMessage(err));
      }
    }

    void syncInitialWallet();

    const unsubscribe = subscribeToWalletNotifications(wallet, {
      onMovementCreated: (transaction) => {
        onMovementCreatedRef.current?.(transaction);
        void refresh();
      },
      onMovementUpdated: () => {
        void refresh();
      },
    });

    return unsubscribe;
  }, [wallet, refresh]);

  return {
    balance: snapshot.balance,
    transactions: snapshot.transactions,
    refreshing,
    refresh,
    lastSyncedAt,
    error,
  };
}
