import {
  generateMnemonic,
  validateMnemonic,
  Wallet,
  type WalletLike,
} from '@secondts/bark-react-native';

import type { SendPaymentParams, SendPaymentResult, WalletSnapshot } from '@/domain';
import { clearMnemonic, hasMnemonic, loadMnemonic, storeMnemonic } from '@/lib';

import { createBarkConfig } from './bark-config';
import { mapBarkBalance, mapBarkMovement, mapLightningSendStatus } from './bark-mappers';
import {
  deleteLegacyMnemonic,
  deleteWalletData,
  getWalletDataPath,
  readLegacyMnemonic,
} from './bark-storage';

export type ArkOneWallet = WalletLike;

/** Generate a fresh 12-word BIP39 mnemonic (bark / audited Rust CSPRNG). */
export function generateSeed(): string {
  return generateMnemonic();
}

/** Validate a BIP39 mnemonic (checksum + wordlist). */
export function validateSeed(mnemonic: string): boolean {
  return validateMnemonic(mnemonic.trim());
}

/** Create a bark wallet from a known mnemonic and persist it to the secure element. */
export async function createWalletFromSeed(mnemonic: string): Promise<ArkOneWallet> {
  const normalized = mnemonic.trim();
  if (!validateMnemonic(normalized)) {
    throw new Error('Invalid recovery phrase');
  }
  const wallet = await Wallet.create(normalized, createBarkConfig(), getWalletDataPath(), false);
  await storeMnemonic(normalized);
  return wallet;
}

/** Generate a new seed, create the wallet, and store the seed securely. */
export async function createWallet(): Promise<ArkOneWallet> {
  return createWalletFromSeed(generateMnemonic());
}

/** Open an existing wallet from a mnemonic. No persistence side effects. */
export async function openWallet(mnemonic: string): Promise<ArkOneWallet> {
  return Wallet.open(mnemonic.trim(), createBarkConfig(), getWalletDataPath());
}

/** Restore a wallet from a user-supplied mnemonic and persist it securely. */
export async function importWallet(mnemonic: string): Promise<ArkOneWallet> {
  const normalized = mnemonic.trim();
  if (!validateMnemonic(normalized)) {
    throw new Error('Invalid recovery phrase');
  }
  const wallet = await openWallet(normalized);
  await storeMnemonic(normalized);
  return wallet;
}

/** Remove the wallet: wipe the stored seed and the local DB. */
export async function removeWallet(): Promise<void> {
  await clearMnemonic();
  deleteWalletData();
}

/** One-time migration of the legacy plaintext mnemonic file into secure storage. */
async function migrateLegacyMnemonic(): Promise<void> {
  if (await hasMnemonic()) {
    return;
  }
  const legacy = await readLegacyMnemonic();
  if (!legacy || !validateMnemonic(legacy)) {
    return;
  }
  // storeMnemonic requires enrolled biometrics; only drop the plaintext on success.
  await storeMnemonic(legacy);
  deleteLegacyMnemonic();
}

export async function loadOrCreateWallet(): Promise<ArkOneWallet> {
  await migrateLegacyMnemonic();

  if (await hasMnemonic()) {
    const mnemonic = await loadMnemonic();
    if (!mnemonic) {
      throw new Error('Unable to read your stored wallet');
    }
    return openWallet(mnemonic);
  }

  return createWallet();
}

export async function syncWallet(wallet: ArkOneWallet): Promise<WalletSnapshot> {
  await wallet.sync();
  const [balance, history] = await Promise.all([wallet.balance(), wallet.history()]);

  return {
    balance: mapBarkBalance(balance),
    transactions: history.map(mapBarkMovement),
  };
}

export function getWalletBalance(wallet: ArkOneWallet) {
  return wallet.balance().then(mapBarkBalance);
}

export function getWalletHistory(wallet: ArkOneWallet) {
  return wallet.history().then((history) => history.map(mapBarkMovement));
}

export function createReceiveAddress(wallet: ArkOneWallet): Promise<string> {
  return wallet.newAddress();
}

export async function sendPayment(
  wallet: ArkOneWallet,
  params: SendPaymentParams,
): Promise<SendPaymentResult> {
  if (params.type === 'ark') {
    const paymentId = await wallet.sendArkoorPayment(params.address, params.amountSats);
    return { type: 'ark', paymentId };
  }

  const status = await wallet.payLightningInvoice(params.invoice, params.amountSats, true);
  return mapLightningSendStatus(status);
}
