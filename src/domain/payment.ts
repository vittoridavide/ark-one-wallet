export type PaymentDestination =
  | {
      type: 'ark';
      address: string;
      amountSats?: bigint;
      description?: string;
    }
  | {
      type: 'bolt11';
      invoice: string;
      amountSats?: bigint;
      description?: string;
    };

export type SendPaymentParams =
  | {
      type: 'ark';
      address: string;
      amountSats: bigint;
    }
  | {
      type: 'bolt11';
      invoice: string;
      amountSats?: bigint;
    };

export type SendPaymentResult =
  | {
      type: 'ark';
      paymentId: string;
    }
  | {
      type: 'bolt11';
      status: 'unknown' | 'in-progress' | 'paid';
      paymentHash?: string;
      preimage?: string;
    };
