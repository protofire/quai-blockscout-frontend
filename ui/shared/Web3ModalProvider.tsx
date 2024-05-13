import '@rainbow-me/rainbowkit/styles.css';

import { Center, Text, useColorMode } from '@chakra-ui/react';
import type {
  DisclaimerComponent } from '@rainbow-me/rainbowkit';
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';

import config from 'configs/app';
import { pelagusWallet } from 'lib/web3/connectors/pelagus-connector';
import currentChain from 'lib/web3/currentChain';

const Disclaimer: DisclaimerComponent = () => {
  return (
    <Center>
      <Text fontSize="xs">QUAI Network Explorer</Text>
    </Center>
  );
};

const feature = config.features.blockchainInteraction;

const getConfig = () => {
  try {
    if (!feature.isEnabled) {
      throw new Error();
    }

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
        [currentChain.id]: http(config.chain.rpcUrl || ''),
      },
    });

    return { wagmiConfig };
  } catch (error) {
    return {};
  }
};

const { wagmiConfig } = getConfig();

interface Props {
  children: React.ReactNode;
  fallback?: JSX.Element | (() => JSX.Element);
}

const Fallback = ({ children, fallback }: Props) => {
  return typeof fallback === 'function' ?
    fallback() :
    fallback || <>{ children }</>; // eslint-disable-line react/jsx-no-useless-fragment
};

const Provider = ({ children, fallback }: Props) => {
  const { colorMode } = useColorMode();
  const [ theme, setTheme ] = React.useState(lightTheme());

  React.useEffect(() => {
    setTheme(colorMode === 'dark' ? darkTheme() : lightTheme());
  }, [ colorMode, setTheme ]);

  // not really necessary, but we have to make typescript happy
  if (!wagmiConfig || !feature.isEnabled) {
    return <Fallback fallback={ fallback }>{ children }</Fallback>;
  }

  return (
    <WagmiProvider config={ wagmiConfig }>
      <RainbowKitProvider
        appInfo={{
          appName: 'QUAI Blockscout',
          disclaimer: Disclaimer,
        }}
        modalSize="compact"
        theme={ theme }
      >
        { children }
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

const Web3ModalProvider =
  wagmiConfig && feature.isEnabled ? Provider : Fallback;

export default Web3ModalProvider;
