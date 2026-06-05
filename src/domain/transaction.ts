export type TransactionDirection = 'in' | 'out';

export type WalletTransaction = {
  id: string;
  direction: TransactionDirection;
  amountSats: bigint;
  feeSats: bigint;
  status: string;
  counterparty: string;
  subsystemName: string;
  subsystemKind: string;
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
};
