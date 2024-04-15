/*
This file displays the migration component. 
It allows users to migrate their PRTC tokens to Zaar tokens.
*/
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect} from "react";
import { 
  parseEther,
} from "viem";
import {
  useAccount,
} from "wagmi";
import { waitForTransactionReceipt } from '@wagmi/core'
import {
  useReadPrtcDecimals,
  useReadPrtcAllowance,
  zaarAddress,
  useSimulatePrtcApprove,
  useSimulateZaarBridge,
} from "../generated";
import useBalance from "../hooks/Balance";
import { writeContract } from '@wagmi/core'
import {config} from '../config';
import toast, { Toaster } from 'react-hot-toast';
import{
  formatEther,
} from "viem";

export const Migration = () => {
  //current user address
  const { address } = useAccount();
  const { prtcBalance, zaarBalance, xPrtcBalance, refetchBalance } = useBalance();
  //reads current approved allowance
  const { data: allowance, refetch:refetchAllowance} = useReadPrtcAllowance({
    args: [address? address: "0x0000000000000000000000000000000000000000", zaarAddress[1]],
  });
  
  //stores amount to be migrated from input field
  //initialized to balance
  const [payAmntUnormalized, setYouPay] = useState(
    prtcBalance? prtcBalance : BigInt(2)
  );
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (inputValue == ""){
      setYouPay(prtcBalance? prtcBalance : BigInt(0));
    }
  }, [inputValue,prtcBalance,  setYouPay]);
  //collects input from payment amount input box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let numberValue = Number(value);
    let roundedStringValue = Number(numberValue).toFixed(6);
    setInputValue(value);
    if(numberValue >= 0){
      setYouPay(parseEther(roundedStringValue));
    }
    else if (numberValue < 0){
      setYouPay(BigInt(0));
    }
    else{
      setYouPay(prtcBalance!=null ? prtcBalance : BigInt(0));
    }
    
  };
  //compares payment amount to current allowance
  //stores the amount remaining to be approved unormalized in variable approvalAmnt
  const approvalAmnt =
    (payAmntUnormalized ? payAmntUnormalized : BigInt(0)) -
    (allowance ? allowance : BigInt(0));

  //Checks if we have funds approved before we can migrate
  const [approved, setApproved] = useState(approvalAmnt<=0);
  useEffect(() => {
    if ((allowance ? allowance : 0 )>= payAmntUnormalized ) {
      setApproved(true);
    }
    else{
      setApproved(false);
    }
  }, [allowance, payAmntUnormalized]);
  //get prepared function to approve
  const { data: approve }: {data: any} = useSimulatePrtcApprove({
    args: [zaarAddress[1], payAmntUnormalized],
  });
  // get prepared function to migrate
  const { data: bridge }: {data: any}= useSimulateZaarBridge({
    args: [payAmntUnormalized],
  });

  //checks the approve function before sending request
  //used to disable button
  const [okToApprove, setOkToApprove] = useState(false);
  useEffect(() => {
    if (approve?.request || false) {
      setOkToApprove(true);
    }
    else{
      setOkToApprove(false);
    }
  }, [approve?.request]);
  //checks the approve function before sending request
  //used to disable button
  const [okToBridge, setOkToBridge] = useState(false);
  useEffect(() => {
    if (bridge?.request || false) {
      setOkToBridge(true);
    }
    else{
      setOkToBridge(false);
    }
  }, [bridge?.request]);
  

  //creating a Write contract to use our prepared functions

  async function approver() {
    const toastId = toast.loading("Waiting on confirmation from your wallet.");
    try{
      let myhash = await writeContract(config, approve!.request);
      toast.dismiss(toastId);
      toast.loading("Transaction Processing");
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      refetchAllowance();
      toast.dismiss();
      if ((allowance ? allowance : 0 )>= (payAmntUnormalized ? payAmntUnormalized : 0) || receipt.status == "success" ){
        toast.success("Success! Funds approved for migration");
      }
      else if (receipt.status == "reverted"){
        console.log(receipt.status.toString())
      }}
    catch (error){
      console.log(error);
      toast.dismiss();
      refetchAllowance();
      if((allowance ? allowance : 0 )>= (payAmntUnormalized ? payAmntUnormalized : 0)){
        toast.success("Success! Funds approved for migration");
      }
      }
    refetchAllowance();
    return;
  }
  
  async function migrater() {
    const toastId = toast.loading("Waiting from confirmation from your wallet");
    try{
      let myhash = await writeContract(config, bridge!.request);
      toast.dismiss();
      toast.loading("Transaction Processing");
      let receipt = await waitForTransactionReceipt(config, { hash: myhash });
      toast.dismiss();
      if (receipt.status == "success"){
        toast.success("Success! Funds migrated");
      }
      else if (receipt.status === "reverted"){
        toast.error("Failed to migrate. Please try again.");
      }}
    catch (error){
      toast.dismiss();
      refetchAllowance();
      toast.error("Failed to migrate. Please try again.");
        }
    refetchAllowance();
    refetchBalance();
    return;
  }

  function approveInfo() {
    const normalizedAllowance = formatEther(allowance ? allowance: BigInt(0));
    return (
      "Current approved allowance: " +
      (normalizedAllowance ? normalizedAllowance : '0')
    );
  }

  return (
    <div className="pt-2 px-0 py-4 sm:px-8 ">
      <Toaster />
      <div className="bg-black text-white w-full sm:max-w-lg mx-auto p-8 rounded-sm w-[900px] bg-black ">
        <div className="mb-4 md:w-[500px]">
          <Link
            href="https://app.protectorate.xyz/stake"
            className={`${xPrtcBalance ? (xPrtcBalance>0? " ":"hidden") : "hidden"}`}
          >
            <div className="text-center bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300 ease-in-out border-2 hover:bg-whitish cursor-pointer border-yellow mb-2">
            Unstake
            </div>
          </Link>
          <div className={`relative bg-dark-gray rounded-sm shadow-md h-30 py-[50px] w-full border-2 ${payAmntUnormalized>(prtcBalance||0)? "border-red" : "border-dark-gray"}`}>
            <input
              id="you-pay"
              type="text"
              className="w-full h-full tracking-wider bg-transparent pl-4 text-3xl font-semibold outline-none"
              placeholder={
                prtcBalance ? Number(formatEther(prtcBalance)).toFixed(6) : "0"
              }
              onChange={handleInputChange}
            />
            <span className={`absolute left-4 bottom-4 text-red uppercase text-xs ${((payAmntUnormalized)>(prtcBalance||0))? " " : "hidden"}`}>
              Error: Insufficient PRTC balance.
            </span>
            <span className="absolute left-4 top-4 text-gray uppercase text-xs">
              You migrate
            </span>
            <span
              className="absolute right-4 bottom-3 text-gray text-sm uppercase"
              id="balance"
            >
              Balance:
              {prtcBalance !== null
                ? Number(formatEther((prtcBalance? prtcBalance: BigInt(0)))).toFixed(6)
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

        <div className="mb-4 h-full md:w-[500px]">
          <div className="relative bg-dark-gray rounded-sm shadow-md h-300 py-[50px]">
            <div className="w-full h-full bg-transparent pl-4 text-3xl font-semibold outline-none">
              {payAmntUnormalized>=0
                ? Number(formatEther(payAmntUnormalized)).toFixed(6)
                : prtcBalance? Number(formatEther(prtcBalance)).toFixed(6): "0"}
            </div>
            <span className="absolute left-4 top-4 text-gray uppercase text-xs">
              You receive
            </span>
            <span
              className="absolute right-4 bottom-3 text-gray text-sm uppercase"
              id="balance"
            >
              Balance:
              {zaarBalance
                ? Number(formatEther(zaarBalance)).toFixed(6)
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
            className={`mt-10 bg-yellow text-black uppercase font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300 ease-in-out border-2 ${(okToApprove || okToBridge) ? 'cursor-pointer hover:bg-whitish hover:border-yellow hover:text-black': 'opacity-50'}`}
            type="button"
            disabled={!okToApprove && !okToBridge}
            onClick={() => {
                !approved ? approver() : migrater()
            }}
          >
            {!approved ? 'Approve' : 'Migrate'}
          </button>
        </div>
      </div>
    </div>
  );
};
