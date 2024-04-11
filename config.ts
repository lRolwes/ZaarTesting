import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {sepolia,} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Zaar',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
      sepolia,
    ],
    ssr: true,
  });