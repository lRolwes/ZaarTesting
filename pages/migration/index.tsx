import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { TopSection } from '../../components/TopSection';
import { Migration } from '../../components/Migration';

const Home: NextPage = () => {
  return (
    <div>
      <main className='bg-black'> 
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
