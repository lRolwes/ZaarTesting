import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {mainnet} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Zaar',
    projectId: '07a5775d26541dd4c353432b24a75b30',
    chains: [
      mainnet,
    ],
    ssr: true,
  });