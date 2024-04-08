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
  const {data: decimal, error: decimalError,} = useReadPrtcDecimals();
  const { data: zaarDecimal, error: zaarDecimalError } = useReadZaarDecimals();
  const [normalizedPrtcBalance, setNormalizedPrtcBalance] = useState(null);
  const [normalizedZaarBalance, setNormalizedZaarBalance] = useState(null);
  useEffect(() => {
    if (!prtcBalanceLoading && prtcBalance && decimal) {
      setNormalizedPrtcBalance((prtcBalance/BigInt(Math.pow(10, decimal))));
    }
  }, [prtcBalance, decimal, prtcBalanceLoading]);
    useEffect(() => {
    if (zaarBalance && zaarDecimal) {
      setNormalizedZaarBalance(zaarBalance / BigInt(Math.pow(10, zaarDecimal)));
    }
  }, [zaarBalance, zaarDecimal]);

  return {
    normalizedPrtcBalance,
    normalizedZaarBalance,
    loading: prtcBalanceLoading,
    error: prtcBalanceError || decimalError,
  };
};

export default useNormalizedBalance;
