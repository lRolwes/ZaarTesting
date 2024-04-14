import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Footer } from '../../components/Footer';
import { MigrationHeader } from '../../components/MigrationHeader';
import { TopSection } from '../../components/TopSection';
import { Migration } from '../../components/Migration';

const Home: NextPage = () => {
  return (
    <div>
      <main className='bg-black'> 
                <MigrationHeader/>
                <TopSection/>
                <Migration/>
                <Footer/>
      </main>

    </div>
  );
};

export default Home;
