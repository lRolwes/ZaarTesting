import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import { Footer } from "../components/Footer";
import { HomeHeader } from "../components/HomeHeader";
const HeroContent = () => {
  return (
    <div className="pt-24 sm:pt-52 pb-32 flex content-center items-center justify-center bg-hero min-h-screen">
      <div
        className="absolute left-0 right-0 w-full h-full bg-center bg-cover z-10"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          height: "100vh", // Set a fixed height
          width: "100vw", // Set a fixed width
        }}
      ></div>
      {/* Gradient Overlay */}

      {/* Hero Content */}
      <div className="container fixed relative mx-auto z-20 mt-0 w-full">
        <div className="text-center text-white flex flex-col justify-center items-center">
          <span className="inline-block text-yellow bg-yellow bg-opacity-20 tracking-widest mb-3 px-6 py-1 rounded-full text-lg z-20">
            <i className="fad fa-stars "></i> LAUNCHING SOON™
          </span>
          <div className="flex relative w-screen justify-center items-center h-auto z-20 ">
            <Image
              src="/images/logo-white.png"
              alt="logo"
              className="fixed rounded-sm z-20 item-center relative"
              width={700}
              height={700}
            />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white uppercase mt-5 z-20">
            A full-featured mobile-friendly NFT marketplace
          </h1>
          <div className="flex justify-center space-x-8 mb-"></div>
          <Link
            href="/migration"
            className="inline-block bg-yellow hover:bg-whitish border-2 border-yellow hover:text-black text-black py-2 px-4 uppercase rounded-sm font-bold mb-20 hover:text-black"
          >
            Migrate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

const BottomSection = () => {
  return (
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
                  earn yield on your idle nfts
                </h1>
                <h3 className="mb-8 sm:mb-0 text-xl text-light-green uppercase mb-0 sm:mb-4">
                  deposit to the nft capsule to earn ETH yield
                </h3>
              </div>
              <Link
                href="/migration"
                className="hidden sm:block bg-yellow hover:bg-whitish border-2 border-yellow hover:text-black text-black hover:text-black py-2 px-4 w-40 mx-auto uppercase mt-4 mb-12 font-bold"
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
                href="/migration"
                className="block sm:hidden bg-yellow text-black hover:bg-whitish border-2 border-yellow hover:text-black font-bold py-2 px-4 w-40 mx-auto uppercase mt-4 mb-12"
              >
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
    <div className="overflow-y-hidden">
      <main id="landing" className="font-secondary">
        <HomeHeader />
        <HeroContent />
        <BottomSection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
