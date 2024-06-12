import Image from "next/image";
import React from "react";
import useBalance from "../hooks/Balance";
import { formatEther } from "viem";

export const TopSection = () => {
  const { prtcBalance, zaarBalance, xPrtcBalance } = useBalance();

  return (
    <div className={`w-full z-50 mt-[65px] md:mt-[55px] contain py-4 bg-dark-gray bg-gradient-to-b from-yellow/15 to-transparent `}> 
      <div className="flex flex-col text-xs items-center justify-center space-y-2">
        <p className="text-xl text-white">PRTC MIGRATION</p>
        <p className="text-base ">Protectorate Protocol is now Zaar.</p>
        <p className="text-base flex flex-center text-center"> PRTC holders must migrate their tokens to ZAAR to avoid having the tokens burned in the future</p>
        <div className="text-sm font-bold text-gray uppercase">
          Your Wallet Balance
        </div>{" "}
        {/* Title added here */}
        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto  space-x-1">
          <div className="bg-dark-gray text-yellow font-bold text-2xl px-3 py-1 rounded">
            {xPrtcBalance ? Number(formatEther(xPrtcBalance)).toFixed(0) : "0"}
          </div>
          <div className="text-light-green mt-2 text-sm uppercase flex  flex-row ml-1">
            <Image
              src="/images/xprtc-token-icon.png"
              alt="logo"
              className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
              width={20}
              height={100}
            />
            <div>
              <span className="lowercase">x</span>
              PRTC
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto space-x-1">
          <div className="bg-dark-gray border border-dark-gray-all text-yellow font-bold text-2xl px-3 py-1 rounded">
            {prtcBalance ? Number(formatEther(prtcBalance)).toFixed(0) : "0"}
          </div>
          <div className="text-light-green mt-2 text-sm uppercase flex flex-row ml-1">
            <Image
              src="/images/prtc-token-icon.png"
              alt="logo"
              className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
              width={30}
              height={100}
            />
            <div>PRTC</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-1/3 max-w-20 sm:w-auto space-x-1">
          <div className="bg-dark-gray border border-dark-gray-all text-yellow font-bold text-2xl px-3 py-1 rounded">
            {zaarBalance ? Number(formatEther(zaarBalance)).toFixed(0) : "0"}
          </div>
          <div className="text-light-green mt-2 text-sm uppercase flex flex-row ml-1">
            <Image
              src="/images/zaar-token-icon.png"
              alt="logo"
              className="rounded-sm h-5 w-5 inline-block mr-1 md:ml-0"
              width={100}
              height={100}
            />
            <div>Zaar</div>
          </div>
        </div>
        <div className={`text-center justify-between w-full  sm:w-auto mt-2 text-white ${xPrtcBalance ? (xPrtcBalance > 0 ? " " : "hidden") : "hidden"}`}>
          In order to migrate your xPRTC you must first unstake it.
        </div>
      </div>
    </div>
  );
};
