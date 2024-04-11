import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { HomeHeader } from "../components/HomeHeader";


const HeroContent = () => {
    return(
        <div className="pt-24 sm:pt-52 pb-32 flex content-center items-center justify-center bg-hero min-h-screen">
          <div
            className="absolute w-full h-full bg-center bg-cover z-10"
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
          ></div>
          {/* Gradient Overlay */}

          {/* Hero Content */}
          <div className="container relative mx-auto z-20 mt-0 w-full">
            <div className="text-center text-white flex flex-col justify-center items-center">
              <span className="inline-block text-yellow bg-yellow bg-opacity-20 tracking-widest mb-3 px-6 py-1 rounded-full text-lg z-20">
                <i className="fad fa-stars "></i> LAUNCHING SOON™
              </span>
              <div className="flex justify-center items-center w-1/2 h-auto z-20">
                <Image
                  src="/images/logo-white.png"
                  alt="logo"
                  className="rounded-sm w-2/5 z-20 item-center"
                  width = {100}
                  height = {100}
                  layout = "responsive"
                  objectFit="contain"
                />
              </div>
              <h1 className="text-3xl font-bold mb-3 text-white uppercase mt-5">
                A full-featured mobile-friendly NFT marketplace
              </h1>
              <div className="flex justify-center space-x-8 mb-"></div>
              <Link
                href="/migrationPage"
                className="inline-block bg-yellow hover:bg-opacity-70 text-black py-2 px-4 uppercase rounded-sm font-bold mb-20 hover:text-black"
              >
                Migrate Now
              </Link>
            </div>
          </div>
        </div>
    );
};

const BottomSection = () => {
    return(
        <div className="container-fluid mx-auto px-4  py-6 mt-0 sm:mt-20 mb-0 sm:mb-12">
          <section className="bg-black text-yellow-400 p-8 mt-20 mb-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row justify-center text-center gap-4">
                <div className="flex-1 px-4 flex flex-col justify-between mb-8 sm:mb-0">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide uppercase text-white">
                      #1 in global <span className="hidden sm:block"></span>{" "}
                      liquidity
                    </h1>
                    <h3 className="mb-8 sm:mb-0 text-xl text-light-green uppercase sm:mb-4">
                      zaar aggregates liquidity from all top platforms
                    </h3>
                  </div>
                </div>
                <div className="flex-1 px-4 flex flex-col justify-between mb-8 sm:mb-0">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide uppercase text-white">
                      earn yield on your idol nfts
                    </h1>
                    <h3 className="mb-8 sm:mb-0 text-xl text-light-green uppercase mb-0 sm:mb-4">
                      deposit to the nft capsule to earn ETH yield
                    </h3>
                  </div>
                  <Link
                    href="/migrationPage"
                    className="hidden sm:block bg-yellow hover:opacity-70 text-black hover:text-black py-2 px-4 w-40 mx-auto uppercase mt-4 mb-12 font-bold"
                  >
                    Migrate now
                  </Link>
                </div>
                <div className="flex-1 px-4 flex flex-col justify-between">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide uppercase text-white">
                      lock zaar to maximize yield
                    </h1>
                    <h3 className="text-xl text-light-green uppercase mb-0 sm:mb-4">
                      upgraded tokenomics model rewards high conviction holders
                    </h3>
                  </div>
                  <Link
                    href="/MigrationPage"
                    className="block sm:hidden bg-yellow btn-hover text-black hover:text-gray-600 py-2 px-4 w-40 mx-auto uppercase mt-4 mb-12">
                    Migrate now
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
    );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Zaar</title>
        <meta
          content="zaar · website"
          name="A first-in-class NFT trading platform for traders of every caliber."
        />
        <link rel="icon" href="/images/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <html data-wf-domain="www.zaar.io" />
        <title>Zaar</title>
        <meta
          content="A first-in-class NFT trading platform for traders of every caliber."
          name="description"
        />
        <meta content="zaar · website" property="og:title" />
        <link rel="icon" href="assets/img/favicon.png" />
        <link href="css/style.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="css/all.css" rel="stylesheet" />
        <script defer src="js/all.js"></script>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        ></link>
      </Head>

      <main id="landing" className = "font-primary">
        <HomeHeader />
        <HeroContent />
        <BottomSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
