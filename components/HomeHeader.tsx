import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ConnectWallet } from "./ConnectWallet";

export const HomeHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-30 flex justify-between items-center p-4 px-8 pl-6 sm:pl-2">
      <div className="flex items-center justify-between md:space-x-4 text-sm">
        <Link href="/">
          <Image
            src="/images/logo-3d.png"
            alt="logo"
            className="rounded-sm h-8 ml-4 mr-4"
            width={30}
            height={100}
          />
        </Link>

        <div className="flex-grow md:hidden"></div>
      </div>

      <nav className="space-x-7 uppercase relative text-lg md:ml-3 font-l">
        <Link
          href="/migration"
          className="text-yellow hover:text-gray "
        >
          Migrate PRTC
        </Link>
        <Link href="#" className="text-yellow hover:text-gray ">
          Earn XP (coming Soon!)
        </Link>
        <Link href="https://t.me/ZaarTradingBot" className="text-yellow hover:text-gray ">
          Start Trading
        </Link>
      </nav>

      <div className="ml-auto">
        <ConnectWallet />
      </div>
    </header>
  );
};
