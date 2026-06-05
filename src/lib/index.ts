// Cross-cutting helpers: secure storage + seed persistence.

export {
  canUseBiometricAuthentication,
  deleteSecureItem,
  getSecureItem,
  SecureStoreKeys,
  setSecureItem,
} from './secure-storage';
export type { SecureItemOptions, SecureStoreKey } from './secure-storage';

export { clearMnemonic, hasMnemonic, loadMnemonic, storeMnemonic } from './seed-storage';
