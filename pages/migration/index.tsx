import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Footer } from '../../components/Footer';
import { HomeHeader } from '../../components/HomeHeader';
import { TopSection } from '../../components/TopSection';
import { Migration } from '../../components/Migration';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "Migrate",
  description: "Migrate your PRTC to Zaar Coins",
}

const Home: NextPage = () => {
  return (
    <div>
      <Head>
      <title>Zaar - Migrate</title>
    </Head>
      <main className='bg-black'> 
                <HomeHeader/>
                <TopSection/>
                <Migration/>
                <Footer/>
      </main>

    </div>
  );
};

export default Home;
