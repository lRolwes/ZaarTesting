import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ConnectWallet } from "./ConnectWallet";

export const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="fixed top-0 left-0 w-full z-30 flex justify-between items-center p-4 px-8 pl-6 sm:pl-2">
      <div className="flex items-center justify-between md:space-x-4 text-sm">
        <button
          id="menu-btn"
          onClick={handleMenuButtonClick}
          className="p-2 focus:outline-none md:hidden text-light-green border border-dark-gray-all hover:border-light-green-all rounded-sm transition-colors duration-150 md:hidden"
        >
          <svg
            className="h-6 w-6 text-yellow md:hidden"
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-LineJoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
              fill="yellow"
            ></path>
          </svg>
        </button>
        {isMenuOpen && (
          <div className="space-y-4 fixed top-0 right-0 bottom-0 left-0 z-10 w-full h-full bg-black flex flex-col items-center justify-center opacity-90 text-3xl font-bold">
            {/* Your mobile navigation menu goes here */}
            <Link href="/migration" className="text-yellow hover:text-gray ">
              <div className="p-5 ">Migrate PRTC</div>
            </Link>
            <Link href="#" className="text-yellow hover:text-gray ">
              <div className="p-5 ">Earn XP (coming Soon!)</div>
            </Link>
            <Link
              href="https://t.me/ZaarTradingBot"
              className="text-yellow hover:text-gray "
            >
              <div className="p-5 ">Start Trading</div>
            </Link>
            <button
              onClick={handleMenuButtonClick}
              className="p-3 text-black bg-yellow hover:text-gray text-4xl rounded-md font-bold"
            >
              X
            </button>
          </div>
        )}
        <Link href="/" className="ml-3 md:ml-0">
          <Image
            src="/images/logo-3d.png"
            alt="logo"
            className="rounded-sm h-8 mr-4"
            width={30}
            height={100}
          />
        </Link>

        <div className="flex-grow md:hidden"></div>
      </div>
      <div className="sm:block hidden">
        <nav className="space-x-7 uppercase relative text-lg md:ml-3 font-l">
          <Link href="/migration" className="text-yellow hover:text-gray ">
            Migrate PRTC
          </Link>
          <Link href="#" className="text-yellow hover:text-gray ">
            Earn XP (coming Soon!)
          </Link>
          <Link
            href="https://t.me/ZaarTradingBot"
            className="text-yellow hover:text-gray "
          >
            Start Trading
          </Link>
        </nav>
      </div>

      <div className="ml-auto">
        <ConnectWallet />
      </div>
    </header>
  );
};
