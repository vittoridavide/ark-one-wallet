import type { WalletTransaction } from './transaction';

export type WalletNetwork = 'bitcoin' | 'mainnet' | 'testnet' | 'signet' | 'regtest';

export type WalletBalance = {
  spendableSats: bigint;
  pendingInRoundSats: bigint;
  pendingExitSats: bigint;
  pendingLightningSendSats: bigint;
  claimableLightningReceiveSats: bigint;
  pendingBoardSats: bigint;
};

export type WalletSnapshot = {
  balance: WalletBalance;
  transactions: WalletTransaction[];
};

export type WalletLoadStatus = 'idle' | 'loading' | 'ready' | 'error';
