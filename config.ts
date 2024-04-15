import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {sepolia, mainnet} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Zaar',
    projectId: 'ZAAR_PROJECT',
    chains: [
      mainnet,
    ],
    ssr: true,
  });