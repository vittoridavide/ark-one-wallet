import { useEffect, useState } from 'react';

import type { WalletLoadStatus } from '@/domain';
import { getBarkErrorMessage, loadOrCreateWallet, type ArkOneWallet } from '@/services/arkone';

export function useWallet() {
  const [wallet, setWallet] = useState<ArkOneWallet | null>(null);
  const [status, setStatus] = useState<WalletLoadStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWallet() {
      setStatus('loading');
      setError(null);

      try {
        const nextWallet = await loadOrCreateWallet();

        if (!cancelled) {
          setWallet(nextWallet);
          setStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          setError(getBarkErrorMessage(err));
          setStatus('error');
        }
      }
    }

    void loadWallet();

    return () => {
      cancelled = true;
    };
  }, []);

  return { wallet, status, error };
}
