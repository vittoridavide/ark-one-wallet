import { Directory, File, Paths } from 'expo-file-system';

const BARK_DIR = '.bark';
const LEGACY_MNEMONIC_FILE = 'mnemonic';
const TRAILING_SLASHES = /\/+$/;

function dataDir(): Directory {
  return new Directory(Paths.document, BARK_DIR);
}

/** Absolute path of the bark wallet DB directory (created on demand). */
export function getWalletDataPath(): string {
  const dir = dataDir();
  if (!dir.exists) {
    dir.create();
  }
  return dir.uri.replace('file://', '').replace(TRAILING_SLASHES, '');
}

/** Delete the entire wallet DB directory (used on wallet removal). */
export function deleteWalletData(): void {
  const dir = dataDir();
  if (dir.exists) {
    dir.delete();
  }
}

function legacyMnemonicFile(): File {
  return new File(dataDir(), LEGACY_MNEMONIC_FILE);
}

/**
 * Reads the pre-secure-storage plaintext mnemonic file, if it still exists.
 * Only used to migrate older installs into the secure element.
 */
export async function readLegacyMnemonic(): Promise<string | null> {
  const file = legacyMnemonicFile();
  if (!file.exists) {
    return null;
  }
  try {
    const contents = (await file.text()).trim();
    return contents || null;
  } catch {
    return null;
  }
}

/** Remove the legacy plaintext mnemonic file after a successful migration. */
export function deleteLegacyMnemonic(): void {
  const file = legacyMnemonicFile();
  if (file.exists) {
    file.delete();
  }
}
