import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {sepolia,} from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'Zaar',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
      sepolia,
      //...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: true,
  });