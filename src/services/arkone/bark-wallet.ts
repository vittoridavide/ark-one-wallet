import { generateMnemonic, Wallet, type WalletLike } from '@secondts/bark-react-native';

import type { SendPaymentParams, SendPaymentResult, WalletSnapshot } from '@/domain';

import { createBarkConfig } from './bark-config';
import { mapBarkBalance, mapBarkMovement, mapLightningSendStatus } from './bark-mappers';
import { getBarkStoragePaths, writeStoredMnemonic } from './bark-storage';

export type ArkOneWallet = WalletLike;

export async function createWallet(): Promise<ArkOneWallet> {
  const { dataPath } = getBarkStoragePaths();
  const mnemonic = generateMnemonic();
  const wallet = await Wallet.create(mnemonic, createBarkConfig(), dataPath, false);
  writeStoredMnemonic(mnemonic);
  return wallet;
}

export async function openWallet(mnemonic: string): Promise<ArkOneWallet> {
  const { dataPath } = getBarkStoragePaths();
  return Wallet.open(mnemonic, createBarkConfig(), dataPath);
}

export async function loadOrCreateWallet(): Promise<ArkOneWallet> {
  const { dataPath, mnemonicFile } = getBarkStoragePaths();

  if (mnemonicFile.exists) {
    const mnemonic = await mnemonicFile.text();
    return Wallet.open(mnemonic, createBarkConfig(), dataPath);
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
