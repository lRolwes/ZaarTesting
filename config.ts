import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {sepolia, mainnet} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Zaar',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
      mainnet,
    ],
    ssr: true,
  });