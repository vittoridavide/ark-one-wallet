import {
  canUseBiometricAuthentication,
  deleteSecureItem,
  getSecureItem,
  SecureStoreKeys,
  setSecureItem,
} from './secure-storage';

/**
 * Persistence for the wallet mnemonic (the master secret).
 *
 * The mnemonic is stored biometric-gated in the secure element, so every read
 * (`loadMnemonic`) triggers an OS auth prompt. A separate non-sensitive presence
 * flag backs `hasMnemonic`, so onboarding/entry routing can check for a wallet
 * without prompting.
 *
 * Validation (BIP39) lives in the wallet service that owns the SDK — this layer
 * only persists an opaque string.
 */

const DEFAULT_PROMPT = 'Authenticate to access your wallet';

/** Persist the mnemonic behind biometric auth. Requires enrolled biometrics. */
export async function storeMnemonic(mnemonic: string): Promise<void> {
  const value = mnemonic.trim();
  if (!value) {
    throw new Error('Refusing to store an empty mnemonic');
  }
  if (!canUseBiometricAuthentication()) {
    throw new Error('Set up device biometrics or a passcode to secure your wallet.');
  }

  await setSecureItem(SecureStoreKeys.mnemonic, value, {
    requireAuthentication: true,
    authenticationPrompt: DEFAULT_PROMPT,
  });
  await setSecureItem(SecureStoreKeys.walletPresent, '1');
}

/** Read the mnemonic — triggers the biometric/passcode prompt. */
export async function loadMnemonic(authenticationPrompt = DEFAULT_PROMPT): Promise<string | null> {
  return getSecureItem(SecureStoreKeys.mnemonic, {
    requireAuthentication: true,
    authenticationPrompt,
  });
}

/** Whether a wallet seed exists — reads the presence flag, never prompts. */
export async function hasMnemonic(): Promise<boolean> {
  return (await getSecureItem(SecureStoreKeys.walletPresent)) === '1';
}

/** Remove the mnemonic and its presence flag. */
export async function clearMnemonic(): Promise<void> {
  await deleteSecureItem(SecureStoreKeys.mnemonic);
  await deleteSecureItem(SecureStoreKeys.walletPresent);
}
