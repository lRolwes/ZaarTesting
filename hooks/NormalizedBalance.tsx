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

const useNormalizedBalance = () => {
  const { address } = useAccount();
  const {
    data: prtcBalance,
    error: prtcBalanceError,
    refetch: refetchPrtcBalance,
  } = useReadPrtcBalanceOf({ args: [address ? address: "0x0000000000000000000000000000000000000000"] });
  const {
    data: zaarBalance,
    error: zaarBalanceError,
    refetch: refetchZaarBalance,
  } = useReadZaarBalanceOf({ args: [address ? address: "0x0000000000000000000000000000000000000000"] });

  const [normalizedPrtcBalance, setNormalizedPrtcBalance] = useState(BigInt(0));
  const [normalizedZaarBalance, setNormalizedZaarBalance] = useState(BigInt(0));
  useEffect(() => {
    if (prtcBalance ) {
      setNormalizedPrtcBalance(BigInt(formatEther(prtcBalance)));
    }
  }, [prtcBalance]);
    useEffect(() => {
    if (zaarBalance) {
      setNormalizedZaarBalance(BigInt(formatEther(zaarBalance)));
    }
  }, [zaarBalance]);

  function refetchBalance() {
    refetchPrtcBalance();
    refetchZaarBalance();
  }

  return {
    normalizedPrtcBalance,
    normalizedZaarBalance,
    error: prtcBalanceError,
    refetchBalance,
  };
};

export default useNormalizedBalance;
