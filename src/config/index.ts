import Constants from 'expo-constants';

type AppRuntimeConfig = {
  apiBaseUrl: string;
  networkName: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Partial<AppRuntimeConfig>;

export const config: AppRuntimeConfig = {
  apiBaseUrl: extra.apiBaseUrl ?? 'http://localhost:3000',
  networkName: extra.networkName ?? 'signet',
};
