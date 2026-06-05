import { Config, Network } from '@secondts/bark-react-native';

import { config } from '@/config';
import type { WalletNetwork } from '@/domain';

export function toBarkNetwork(networkName: string): Network {
  switch (networkName.toLowerCase() as WalletNetwork) {
    case 'bitcoin':
    case 'mainnet':
      return Network.Bitcoin;
    case 'testnet':
      return Network.Testnet;
    case 'regtest':
      return Network.Regtest;
    case 'signet':
    default:
      return Network.Signet;
  }
}

export function createBarkConfig() {
  return Config.create({
    serverAddress: config.arkServerUrl,
    esploraAddress: config.esploraUrl,
    network: toBarkNetwork(config.networkName),
  });
}
