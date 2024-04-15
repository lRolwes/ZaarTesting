import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";

export const XpHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className= {`fixed top-0 left-0 w-full z-30 flex justify-between items-center px-8 pl-6 sm:pl-2 bg-black bg-opacity-20 filter ${isMenuOpen? " " : " backdrop-blur-md"}`}>
      <div className="flex justify-between items-center p-3 px-0  pl-2 border-dark-gray w-full">
        {/* Logo and Navigation */}
        <div className="flex items-center justify-between md:space-x-4 text-sm z-1000">
          {isMenuOpen && (
            <div className="space-y-4 fixed top-0 right-0 bottom-0 left-0 z-1000 w-full h-full bg-black flex flex-col items-center justify-center opacity-90 text-3xl font-bold z-1000">
              {/* Your mobile navigation menu goes here */}
              <ConnectWallet />
              <Link href="/migration" className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1">
                <div className="p-5 ">HOME</div>
              </Link>
              <Link href="/migration" className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1">
                <div className="p-5 ">MIGRATE PRTC</div>
              </Link>
              <Link href="/xp" className="text-white hover:text-white">
                <div className="p-5 ">EARN XP</div>
              </Link>
              <Link
                href="https://t.me/ZaarTradingBot"
                className="text-yellow hover:text-hoveryellow transform hover:-translate-y-1 "
              >
                <div className="p-5 ">TELEGRAM TRADING</div>
              </Link>
              <button
                onClick={handleMenuButtonClick}
                className="p-3 text-black bg-yellow hover:text-white transform hover:-translate-y-1 text-4xl rounded-md font-bold fixed top-4 right-5"
              >
                X
              </button>
            </div>
          )}
          <div className="ml-0">
            <Link href="/" className=" ">
              <Image
                src="/images/logo-3d.png"
                alt="logo"
                className="rounded-sm h-8 mr-4 "
                width={30}
                height={100}
              />
            </Link>
          </div>

          <div className="flex-grow md:hidden"></div>
        </div>
        <div className="lg:block hidden">
          <nav className="space-x-7 uppercase relative text-md md:ml-3 font-l flex flex-row">
            <Link href="/migration" className="contain ">
            <div className="text-yellow  hover:text-hoveryellow transform hover:-translate-y-1 ">
              Migrate PRTC
              </div>
            </Link>
            <Link href="/xp" >
              <div className="text-white transform -translate-y-1">  
              Earn XP
              </div>
            </Link>
            <Link
              href="https://t.me/ZaarTradingBot"
              className="text-yellow  contain "
            >
              <div className="text-yellow  hover:text-hoveryellow transform hover:-translate-y-1 ">
              Telegram Trading
              </div>
            </Link>
          </nav>
        </div>
        {/* Connect Button */}
        <div className="ml-auto z-2">
          <div className="flex items-center text-gray mr-0">
            <div className="group flex flex-row space-x-4 z-2">
              <ConnectWallet />
              <button
                id="menu-btn"
                onClick={handleMenuButtonClick}
                className="p-2 focus:outline-none lg:hidden text-light-green border border-dark-gray-all hover:border-light-green-all rounded-sm transition-colors duration-150 lg:hidden"
              >
                <svg
                  className="h-6 w-6 text-yellow lg:hidden"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                    fill="yellow"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
