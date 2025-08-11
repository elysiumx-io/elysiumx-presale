import React, { useState } from 'react';
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import evmConfig from './web3authContext.evm';
import solanaConfig from './web3authContext.solana';
import EvmApp from './App.evm';
import SolanaApp from './App.solana';
import ChainSelection from './components/ChainSelection';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [chain, setChain] = useState<'evm' | 'solana' | null>(null);

  if (!chain) {
    return <ChainSelection onSelectChain={setChain} />;
  }

  if (chain === 'evm') {
    return (
      <Web3AuthProvider config={evmConfig}>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider>
            <EvmApp />
          </WagmiProvider>
        </QueryClientProvider>
      </Web3AuthProvider>
    );
  }

  if (chain === 'solana') {
    return (
      <Web3AuthProvider config={solanaConfig}>
        <SolanaApp />
      </Web3AuthProvider>
    );
  }

  return null;
};

export default App;