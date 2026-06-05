import Constants from 'expo-constants';

type AppRuntimeConfig = {
  apiBaseUrl: string;
  networkName: string;
  arkServerUrl: string;
  esploraUrl: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Partial<AppRuntimeConfig>;

export const config: AppRuntimeConfig = {
  apiBaseUrl: extra.apiBaseUrl ?? 'http://localhost:3000',
  networkName: extra.networkName ?? 'signet',
  arkServerUrl: extra.arkServerUrl ?? 'https://ark.signet.2nd.dev',
  esploraUrl: extra.esploraUrl ?? 'https://esplora.signet.2nd.dev',
};
