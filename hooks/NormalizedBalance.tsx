import { useState, useEffect } from "react";
import {
  useAccount,
} from "wagmi";
import {
  useReadPrtcBalanceOf,
  useReadPrtcDecimals,
  useReadZaarBalanceOf,
  useReadZaarDecimals,
} from "../generated";
import{
  parseEther, 
  formatEther,
} from "viem";

const useNormalizedBalance = () => {
  const { address } = useAccount();
  const {
    data: prtcBalance,
    loading: prtcBalanceLoading,
    error: prtcBalanceError,
  } = useReadPrtcBalanceOf({ args: [address] });
  const {
    data: zaarBalance,
    error: zaarBalanceError,
  } = useReadZaarBalanceOf({ args: [address] });

  const [normalizedPrtcBalance, setNormalizedPrtcBalance] = useState(BigInt(0));
  const [normalizedZaarBalance, setNormalizedZaarBalance] = useState(BigInt(0));
  useEffect(() => {
    if (!prtcBalanceLoading && prtcBalance ) {
      setNormalizedPrtcBalance(formatEther(prtcBalance));
    }
  }, [prtcBalance, prtcBalanceLoading]);
    useEffect(() => {
    if (zaarBalance) {
      setNormalizedZaarBalance(formatEther(zaarBalance));
    }
  }, [zaarBalance]);

  return {
    normalizedPrtcBalance,
    normalizedZaarBalance,
    loading: prtcBalanceLoading,
    error: prtcBalanceError,
  };
};

export default useNormalizedBalance;
