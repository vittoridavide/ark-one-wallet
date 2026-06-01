import type { ConfigContext, ExpoConfig } from 'expo/config';

const DEFAULT_API_BASE_URL = 'http://localhost:3000';
const DEFAULT_NETWORK_NAME = 'signet';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    ...config.extra,
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    networkName: process.env.EXPO_PUBLIC_NETWORK_NAME ?? DEFAULT_NETWORK_NAME,
  },
});
