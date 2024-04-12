import { useState, useEffect } from "react";
import {
  useAccount,
} from "wagmi";
import {
  useReadPrtcBalanceOf,
  useReadZaarBalanceOf,
} from "../generated";
import{
  formatEther,
} from "viem";

const useBalance = () => {
  const { address } = useAccount();
  const {
    data: prtcBalance,
    refetch: refetchPrtcBalance,
  } = useReadPrtcBalanceOf({ args: [address ? address: "0x0000000000000000000000000000000000000000"] });
  const {
    data: zaarBalance,
    refetch: refetchZaarBalance,
  } = useReadZaarBalanceOf({ args: [address ? address: "0x0000000000000000000000000000000000000000"] });

  function refetchBalance() {
    refetchPrtcBalance();
    refetchZaarBalance();
  }

  return {
    prtcBalance,
    zaarBalance,
    refetchBalance,
  };
};

export default useBalance;
