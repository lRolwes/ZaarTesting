import { useState, useEffect } from "react";
import {
  useAccount,
} from "wagmi";
import {
  useReadPrtcBalanceOf,
  useReadZaarBalanceOf,
  useReadXPrtcBalanceOf,
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

  const {
    data: xPrtcBalance,
    refetch: refetchXPrtcBalance,
  } = useReadXPrtcBalanceOf({ args: [address ? address: "0x0000000000000000000000000000000000000000"] });

  function refetchBalance() {
    refetchPrtcBalance();
    refetchZaarBalance();
    refetchXPrtcBalance();
  }

  return {
    prtcBalance,
    zaarBalance,
    xPrtcBalance,
    refetchBalance,
  };
};

export default useBalance;
