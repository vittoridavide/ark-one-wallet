import { useCallback, useState } from 'react';

import { createReceiveAddress, getBarkErrorMessage, type ArkOneWallet } from '@/services/arkone';

export function useReceiveAddress(wallet: ArkOneWallet | null) {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    if (!wallet) {
      setError('No wallet is loaded');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const nextAddress = await createReceiveAddress(wallet);
      setAddress(nextAddress);
      return nextAddress;
    } catch (err) {
      const message = getBarkErrorMessage(err);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [wallet]);

  return { address, loading, error, generate };
}
