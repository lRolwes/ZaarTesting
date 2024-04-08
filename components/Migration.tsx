import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
} from "wagmi";
import {
  useReadPrtc,
  useReadPrtcBalanceOf,
  useReadPrtcDecimals,
  useReadPrtcAllowance,
  zaarAddress,
  useSimulatePrtcApprove,
  useSimulateZaarBridge,
  useReadZaarBalanceOf, 
  useReadZaarDecimals,
} from "../generated";
import { addressResolverAbi } from "viem/_types/constants/abis";
export const Migration = () => {
  //current user address
  const { address } = useAccount();
  //reading user account balance unormalized
  const {
    data: balance,
    error: balanceError,
  } = useReadPrtcBalanceOf({ args: [address] });
  const {
    data: zaarBalance,
    error: zaarBalanceError,
  } = useReadZaarBalanceOf({ args: [address] });
  const [normalizedBalance, setNormalizedBalance] = useState(null);
  const [normalizedZaarBalance, setNormalizedZaarBalance] = useState(null);

  //reads number of decimals for this currency
  const { data: zaarDecimal, error: zaarDecimalError } = useReadZaarDecimals();
  const { data: prtcDecimal, error: prtcDecimalError } = useReadPrtcDecimals();
  useEffect(() => {
    if (balance && prtcDecimal) {
      setNormalizedBalance(balance / BigInt(Math.pow(10, prtcDecimal)));
    }
  }, [balance, prtcDecimal]);
  useEffect(() => {
    if (zaarBalance && zaarDecimal) {
      setNormalizedZaarBalance(zaarBalance / BigInt(Math.pow(10, zaarDecimal)));
    }
  }, [zaarBalance, zaarDecimal]);
  //reads current approved allowance
  const { data: allowance, error: allowanceError } = useReadPrtcAllowance({
    args: [address, zaarAddress[11155111]],
  });
  //stores amount to be migrated from input field
  //initialized to balance
  const [youPay, setYouPay] = useState(
    normalizedBalance ? normalizedBalance.toString() : ""
  );
  //compares payment amount to current allowance
  //converts payment amount to un-normalized form
  //stores the amount remaining to be approved unormalized
  const apprAmnt =
    (youPay ? BigInt(youPay) : BigInt(0)) *
      BigInt(Math.pow(10, prtcDecimal ? prtcDecimal : 0)) -
    (allowance ? allowance : BigInt(0));
  //converts payment amount to un-normalized form
  const payAmnt =
    (youPay ? BigInt(youPay) : BigInt(0)) *
    BigInt(Math.pow(10, prtcDecimal ? prtcDecimal : 0));
  //handles input from payment amount input box
  const handleInputChange = (event) => {
    setYouPay(event.target.value);
  };
  //do we have funds to approve before we can migrate?
  const [approved, setApproved] = useState(apprAmnt<=0);
  // get prepared function to approve
  const { data: approve } = useSimulatePrtcApprove({
    args: [zaarAddress[11155111], apprAmnt],
  });
  const { writeContract } = useWriteContract();
  // get prepared function to migrate
  const { data: bridge } = useSimulateZaarBridge({
    args: [payAmnt],
  });

  //operations to be executed after approving funds
  //if we need to approve funds before migrating set to false
  function approveClick() {
    if (apprAmnt <=0 ) {
        setApproved(true);
    }
    else { 
        setApproved(false);
    }
  }

  function approveInfo() {
    return (
      "Current approved allowance: " +
      (allowance ? allowance.toString() : 0)
    );
  }

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
              {normalizedBalance !== null
                ? normalizedBalance.toString()
                : "0"}{" "}
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
              {youPay
                ? youPay.toString()
                : normalizedBalance
                  ? normalizedBalance.toString()
                  : "0"}
            </div>
            <span className="absolute left-4 top-4 text-gray uppercase text-xs">
              You receive
            </span>
            <span
              className="absolute right-4 bottom-3 text-gray text-sm uppercase"
              id="balance"
            >
              Balance:
              {normalizedZaarBalance !== null
                ? normalizedZaarBalance.toString()
                : "0"}{" "}
              ZAAR
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
            id="approve-btn"
            className="mt-4 bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            disabled={!Boolean(approve?.request)}
            onClick={() => {
                writeContract(approve!.request);
                approveClick();
            }}
          >
            Approve
          </button>
          <button
            id="migrate-btn"
            className={`mt-4 bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full ${(!Boolean(bridge?.request) || !approved) ? 'opacity-50' : ''}`}
            type="button"
            disabled={(!Boolean(bridge?.request)) || !approved}
            onClick={() => {
                writeContract(bridge!.request);
            }}
          >
            Migrate
          </button>
          <div> {approveInfo()} </div>
        </div>
      </div>
    </div>
  );
};
