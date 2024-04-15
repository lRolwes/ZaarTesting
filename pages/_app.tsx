import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {config} from '../config';
import { RainbowKitProvider, darkTheme} from '@rainbow-me/rainbowkit';
import Head from 'next/head';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Zaar',
  description: 'A first-in-class NFT trading platform for traders of every caliber.',
}
const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    
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
  );
}

export default MyApp;
