import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { TopSection } from '../components/TopSection';
import { Migration } from '../components/Migration';
import { CustomButton } from '../components/ConnectWallet';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zaar</title>
        <meta
          content="zaar · website"
          name="A first-in-class NFT trading platform for traders of every caliber."
        />
        <link rel="icon" href="/images/favicon.png"/>
      </Head>

      <main className='bg-black h-screen'> 
                <meta content="zaar · website" property="og:title"/>
                {/*Favicon*/}
                <link rel="icon" href="/favicon.png"/>
                <Header/>
                <TopSection/>
                <Migration/>
                <Footer/>
      </main>

    </div>
  );
};

export default Home;
