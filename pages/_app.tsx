import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {config} from '../config';
import { RainbowKitProvider, darkTheme} from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import type { Metadata } from 'next';
import {
  ReservoirKitProvider,
  lightTheme,
} from '@reservoir0x/reservoir-kit-ui';
import { createClient, reservoirChains } from "@reservoir0x/reservoir-sdk"


const theme = lightTheme({
  headlineFont: "Sans Serif",
  font: "Serif",
  primaryColor: "#323aa8",
  primaryHoverColor: "#252ea5",
})
 
export const metadata: Metadata = {
  title: 'Zaar',
  description: 'A first-in-class NFT trading platform for traders of every caliber.',
}
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReservoirKitProvider
      options={{
        chains: [{
          ...reservoirChains.mainnet,
          active: true,
          },
        ],
        apiKey: "f1bc813b-97f8-5808-83de-1238af13d6f9", // Get started with an api key here: https://docs.reservoir.tools/reference/rate-limits
        source: "YOUR_SOURCE",
      }}
    >
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider theme={darkTheme({accentColor:'#e3bf00', accentColorForeground:'black', overlayBlur:'small'})}>
        <Head>
          <title>Zaar</title>
          <link rel="icon" href="/images/favicon.png"/>
        </Head>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
    </ReservoirKitProvider>
  );
}

export default MyApp;
