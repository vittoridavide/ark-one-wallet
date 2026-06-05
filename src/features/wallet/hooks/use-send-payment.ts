import { useCallback, useState } from 'react';

import type { SendPaymentParams, SendPaymentResult } from '@/domain';
import { getBarkErrorMessage, sendPayment, type ArkOneWallet } from '@/services/arkone';

export function useSendPayment(wallet: ArkOneWallet | null) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SendPaymentResult | null>(null);

  const send = useCallback(
    async (params: SendPaymentParams) => {
      if (!wallet) {
        setError('No wallet is loaded');
        return null;
      }

      setSending(true);
      setError(null);
      setResult(null);

      try {
        const paymentResult = await sendPayment(wallet, params);
        setResult(paymentResult);
        return paymentResult;
      } catch (err) {
        const message = getBarkErrorMessage(err);
        setError(message);
        return null;
      } finally {
        setSending(false);
      }
    },
    [wallet],
  );

  return { send, sending, error, result };
}
