/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
import Image from "next/image";
import React, { use } from "react";
import { useToaster } from 'react-hot-toast/headless';
import Link from "next/link";
import { useState, useEffect} from "react";
import { config } from "../wagmi.config";
import { 
  parseEther,
  formatEther,
} from "viem";
import {
  useAccount,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core'
import {
  useReadPrtcDecimals,
  useReadPrtcAllowance,
  zaarAddress,
  useSimulatePrtcApprove,
  useSimulateZaarBridge,
} from "../generated";
import useNormalizedBalance from "../hooks/NormalizedBalance";
import { write } from "fs";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'
export const Migration = () => {
  const config = createConfig({
    chains: [ sepolia],
    transports: {
      [sepolia.id]: http(),
    },
  })
  //current user address
  const { address } = useAccount();
  //reads number of decimals for this currency
  const { data: prtcDecimal, error: prtcDecimalError } = useReadPrtcDecimals();
  const { normalizedPrtcBalance, normalizedZaarBalance} = useNormalizedBalance();
  //reads current approved allowance
  const { data: allowance } = useReadPrtcAllowance({
    args: [address, zaarAddress[11155111]],
  });
  //stores amount to be migrated from input field
  //initialized to balance
  const [payAmntNormalized, setYouPay] = useState(
    normalizedPrtcBalance ? normalizedPrtcBalance.toString() : ""
  );
  //collects input from payment amount input box
  const handleInputChange = (event) => {
    setYouPay(event.target.value);
  };
  //converts payment amount to un-normalized form
  const payAmntUnormalized =
    parseEther(payAmntNormalized);
  //compares payment amount to current allowance
  //stores the amount remaining to be approved unormalized in variable approvalAmnt
  const approvalAmnt =
    (payAmntUnormalized ? BigInt(payAmntUnormalized) : BigInt(0)) -
    (allowance ? allowance : BigInt(0));

  //Checks if we have funds approved before we can migrate
  const [approved, setApproved] = useState(approvalAmnt<=0);
  useEffect(() => {
    if (allowance >= payAmntUnormalized ) {
      setApproved(true);
    }
    else{
      setApproved(false);
    }
  }, [allowance, payAmntUnormalized]);
  //get prepared function to approve
  const { data: approve } = useSimulatePrtcApprove({
    args: [zaarAddress[11155111], payAmntUnormalized],
  });
  // get prepared function to migrate
  const { data: bridge } = useSimulateZaarBridge({
    args: [payAmntUnormalized],
  });
  //creating a Write contract to use our prepared functions
  const { writeContract } = useWriteContract();
  const [result, setResult] = useState("");
  useEffect(() => {
    if(result !== ""){
      alert("hello2");
      alert(result.toString());
    }},[result]);
  function approver() {
    const myhash = async() => writeContract(approve!.request);
    const waiter = async() =>{ 
      const receipt = await waitForTransactionReceipt(config, { hash: myhash }); // Pass hashString as argument
      setResult(receipt.status ? "Approved" : "Failed");
    }
    waiter();
    return;
  }
  
  function migrater() {
    writeContract(bridge!.request);
    return;
  }
  function approveInfo() {
    const normalizedAllowance = (allowance ? allowance.toString() : 0) / (Math.pow(10, prtcDecimal ? prtcDecimal : 0));;
    return (
      "Current approved allowance: " +
      (normalizedAllowance ? normalizedAllowance.toString() : 0)
    );
  }

  return (
    <div className="pt-2 px-0 py-4 sm:px-8 ">
      <div className="bg-black text-white w-full sm:max-w-lg mx-auto p-8 rounded-sm w-[900px] bg-black ">
        <div className="mb-4 w-[500px]">
          <Link
            href="https://app.protectorate.xyz/stake."
            className="inline-block bg-gray text-light-green py-2 px-4 uppercase text-xs rounded-sm font-bold hover:bg-gray-100 hover:text-black transition-colors duration-300 ease-in-out mb-4"
          >
            Unstake
          </Link>
          <div className="relative bg-dark-gray rounded-sm shadow-md h-30 py-[50px] w-full">
            <input
              id="you-pay"
              type="text"
              className="w-full h-full tracking-wider bg-transparent pl-4 text-3xl font-semibold outline-none"
              placeholder={
                normalizedPrtcBalance !== null ? normalizedPrtcBalance.toString() : "0"
              }
              value={payAmntNormalized}
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
              {normalizedPrtcBalance !== null
                ? normalizedPrtcBalance.toString()
                : "0"}{" "}
              PRTC
            </span>
            <span className="absolute text-2xl right-4 top-1/2 transform -translate-y-1/2 text-xl font-bold cursor-default font-bold px-2 py-1 leading-1 text-light-green rounded-sm inline-flex items-center bg-gray uppercase mt-1">
              <Image
                src="/images/prtc-token-icon.png"
                alt="logo"
                className="rounded-sm h-6 w-6 mr-2 md:ml-0"
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
              {payAmntNormalized
                ? payAmntNormalized.toString()
                : normalizedPrtcBalance
                  ? normalizedPrtcBalance.toString()
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
                className="rounded-sm h-6 w-6 mr-2 md:ml-0"
                width={30}
                height={100}
              />{" "}
              Zaar
            </span>
          </div>
          <button
            id="approve-btn"
            className={`mt-10 bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full `}
            type="button"
            disabled={!Boolean(approve?.request) }
            onClick={() => {
                !approved ? approver() : migrater()
                //writeContract(approve!.request)
            }}
          >
            {!approved ? 'Approve' : 'Migrate'}
          </button>
          <div> {approveInfo()}, {result} </div>
        </div>
      </div>
    </div>
  );
};
