import type { ConfigContext, ExpoConfig } from 'expo/config';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const DEFAULT_NETWORK_NAME = 'signet';
const DEFAULT_ARK_SERVER_URL = 'https://ark.signet.2nd.dev';
const DEFAULT_ESPLORA_URL = 'https://esplora.signet.2nd.dev';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: config.name ?? 'ark-one-wallet',
  slug: config.slug ?? 'ark-one-wallet',
  extra: {
    ...config.extra,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    networkName: process.env.EXPO_PUBLIC_NETWORK_NAME ?? DEFAULT_NETWORK_NAME,
    arkServerUrl: process.env.EXPO_PUBLIC_ARK_SERVER_URL ?? DEFAULT_ARK_SERVER_URL,
    esploraUrl: process.env.EXPO_PUBLIC_ESPLORA_URL ?? DEFAULT_ESPLORA_URL,
  },
});
