import { Directory, File, Paths } from 'expo-file-system';

const BARK_DIR = '.bark';
const MNEMONIC_FILE_NAME = 'mnemonic';
const TRAILING_SLASHES = /\/+$/;

export type BarkStoragePaths = {
  dataPath: string;
  mnemonicFile: File;
};

export function getBarkStoragePaths(): BarkStoragePaths {
  const dataDir = new Directory(Paths.document, BARK_DIR);
  const dataPath = dataDir.uri.replace('file://', '').replace(TRAILING_SLASHES, '');
  const mnemonicFile = new File(dataDir, MNEMONIC_FILE_NAME);

  if (dataDir.exists && !mnemonicFile.exists) {
    dataDir.delete();
  }

  if (!dataDir.exists) {
    dataDir.create();
  }

  return { dataPath, mnemonicFile };
}

export async function readStoredMnemonic(): Promise<string | null> {
  try {
    const { mnemonicFile } = getBarkStoragePaths();
    return mnemonicFile.exists ? await mnemonicFile.text() : null;
  } catch {
    return null;
  }
}

export function writeStoredMnemonic(mnemonic: string): void {
  const { mnemonicFile } = getBarkStoragePaths();

  if (!mnemonicFile.exists) {
    mnemonicFile.create();
  }

  mnemonicFile.write(mnemonic);
}
