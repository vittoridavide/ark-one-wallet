import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Hardware-backed secure storage — iOS Keychain / Android Keystore via
 * expo-secure-store. Items can be gated by the device's biometric/passcode
 * (enforced by the secure element) with `requireAuthentication`.
 *
 * Web has no Keychain equivalent and is intentionally unsupported here — the
 * wallet is native-only.
 */

const KEYCHAIN_SERVICE = 'ark-one';

export const SecureStoreKeys = {
  /** The wallet mnemonic — stored with `requireAuthentication`. */
  mnemonic: 'arkone.mnemonic',
  /**
   * Non-sensitive presence marker. Lets us answer "does a wallet exist?" without
   * triggering the biometric prompt that reading the gated mnemonic would.
   */
  walletPresent: 'arkone.wallet_present',
} as const;

export type SecureStoreKey = (typeof SecureStoreKeys)[keyof typeof SecureStoreKeys];

export interface SecureItemOptions {
  /** Require biometric/passcode auth on access (enforced by the secure element). */
  requireAuthentication?: boolean;
  /** Message shown in the OS auth prompt when `requireAuthentication` is set. */
  authenticationPrompt?: string;
}

function assertNative(): void {
  if (Platform.OS === 'web') {
    throw new Error('Secure storage is unavailable on web — run a native build.');
  }
}

function toOptions(options?: SecureItemOptions): SecureStore.SecureStoreOptions {
  return {
    keychainService: KEYCHAIN_SERVICE,
    // Device-only so secrets never sync to iCloud Keychain or device backups.
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    requireAuthentication: options?.requireAuthentication,
    authenticationPrompt: options?.authenticationPrompt,
  };
}

/** True if the device has biometrics enrolled (required for auth-gated items). */
export function canUseBiometricAuthentication(): boolean {
  return SecureStore.canUseBiometricAuthentication();
}

export async function setSecureItem(
  key: SecureStoreKey,
  value: string,
  options?: SecureItemOptions,
): Promise<void> {
  assertNative();
  await SecureStore.setItemAsync(key, value, toOptions(options));
}

export async function getSecureItem(
  key: SecureStoreKey,
  options?: SecureItemOptions,
): Promise<string | null> {
  assertNative();
  return SecureStore.getItemAsync(key, toOptions(options));
}

export async function deleteSecureItem(key: SecureStoreKey): Promise<void> {
  assertNative();
  await SecureStore.deleteItemAsync(key, { keychainService: KEYCHAIN_SERVICE });
}
