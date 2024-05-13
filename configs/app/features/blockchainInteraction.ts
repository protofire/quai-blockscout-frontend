import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import type { Config } from 'wagmi';
import { createConfig, http } from 'wagmi';

import type { Feature } from './types';

import { pelagusWallet } from 'lib/web3/connectors/pelagus-connector';
import currentChain from 'lib/web3/currentChain';

import chain from '../chain';
import { getEnvValue } from '../utils';

const walletConnectProjectId = getEnvValue('NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID');

const title = 'Blockchain interaction (writing to contract, etc.)';

const config: Feature<{ walletConnect: { projectId: string }; config: {wagmiConfig?: Config | undefined} }> = (() => {

  if (
    // all chain parameters are required for wagmi provider
    // @wagmi/chains/dist/index.d.ts
    chain.id &&
    chain.name &&
    chain.currency.name &&
    chain.currency.symbol &&
    chain.currency.decimals &&
    chain.rpcUrl &&
    walletConnectProjectId
  ) {

    const getConfig = () => {
      try {
        const connectors = connectorsForWallets(
          [
            {
              groupName: 'Recommended',
              wallets: [ pelagusWallet ],
            },
          ],
          {
            appName: 'QUAI Explorer',
            projectId: 'YOUR_PROJECT_ID',
          },
        );

        const wagmiConfig = createConfig({
          ssr: false,
          connectors,
          chains: [ currentChain ],
          transports: {
            [currentChain.id]: http(chain.rpcUrl || ''),
          },
        });

        return { wagmiConfig };
      } catch (error) {
        return {};
      }
    };

    return Object.freeze({
      title,
      isEnabled: true,
      config: getConfig(),
      walletConnect: {
        projectId: walletConnectProjectId,
      },
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
