import Image from "next/image";
import React from "react";
import { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useBalance,
} from "wagmi";
import {
  useReadPrtc,
  useReadPrtcBalanceOf,
  useReadPrtcDecimals,
} from "../generated";
import useNormalizedBalance from "./Account";
export const Migration = () => {
  const { normalizedBalance, normloading, normerror } = useNormalizedBalance();
  const [youPay, setYouPay] = useState(normalizedBalance ? normalizedBalance.toString() : '');

  const handleInputChange = (event) => {
    setYouPay(event.target.value);
  };
  if (normloading) return <div>Loading...</div>;
  if (normerror) return <div>Error: {error.message}</div>;
  return (
    <div className="pt-2 px-0 py-4 sm:px-8 ">
      <div className="bg-black text-white w-full sm:max-w-lg mx-auto p-8 rounded-sm w-[900px] bg-black ">
        <div className="mb-4 w-[500px]">
          <a
            href="#collections"
            className="inline-block bg-gray text-light-green py-2 px-4 uppercase text-xs rounded-sm font-bold hover:bg-gray-100 hover:text-black transition-colors duration-300 ease-in-out mb-4"
          >
            Unstake
          </a>
          <div className="relative bg-dark-gray rounded-sm shadow-md h-30 py-[50px] w-full">
            <input
              id="you-pay"
              type="text"
              className="w-full h-full tracking-wider bg-transparent pl-4 text-3xl font-semibold outline-none"
              placeholder={
                normalizedBalance !== null ? normalizedBalance.toString() : "0"
              }
              value={youPay}
              onChange={handleInputChange}
            />
            <span className="absolute left-4 top-4 text-gray uppercase text-xs">
              You migrate
            </span>
            <span
              className="absolute right-4 bottom-3 text-gray text-sm uppercase"
              id="balance"
            >
              Balance:
              {normalizedBalance !== null ? normalizedBalance.toString() : "0"}{" "}
              PRTC
            </span>
            {/* Max button removed */}
            <span className="absolute text-2xl right-4 top-1/2 transform -translate-y-1/2 text-xl font-bold cursor-default font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center bg-gray uppercase mt-1">
              <Image
                src="/images/prtc-token-icon.png"
                alt="logo"
                className="rounded-sm h-6 mr-2 md:ml-0"
                width={30}
                height={100}
              />{" "}
              PRTC
            </span>
          </div>
        </div>

        <div className="mb-4 h-full w-[500px]">
          <div className="relative bg-dark-gray rounded-sm shadow-md h-300 py-[50px]">
            <div className="w-full h-full bg-transparent pl-4 text-3xl font-semibold outline-none">
              {youPay ? youPay.toString() : (normalizedBalance ? normalizedBalance.toString() : '0')}
            </div>
            <span className="absolute left-4 top-4 text-gray uppercase text-xs">
              You receive
            </span>
            <span className="absolute text-2xl right-4 top-1/2 transform -translate-y-1/2 text-xl font-bold cursor-default font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center bg-gray uppercase mt-1">
              <Image
                src="/images/zaar-token-icon.png"
                alt="logo"
                className="rounded-sm h-6 mr-2 md:ml-0"
                width={30}
                height={100}
              />{" "}
              Zaar
            </span>
          </div>
          <button
            id="migrate-btn"
            className="mt-4 bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};
