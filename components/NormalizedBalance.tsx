import { useState, useEffect } from "react";
import {
  useAccount,
} from "wagmi";
import {
  useReadPrtcBalanceOf,
  useReadPrtcDecimals,
} from "../generated";

const useNormalizedBalance = () => {
  const { address } = useAccount();
  const {
    data: balance,
    loading: balanceLoading,
    error: balanceError,
  } = useReadPrtcBalanceOf({ args: [address] });
  const {
    data: decimal,
    loading: decimalLoading,
    error: decimalError,
  } = useReadPrtcDecimals();

  const [normalizedBalance, setNormalizedBalance] = useState(null);

  useEffect(() => {
    if (!balanceLoading && !decimalLoading && balance && decimal) {
      setNormalizedBalance((balance/BigInt(Math.pow(10, decimal))));
    }
  }, [balance, decimal, balanceLoading, decimalLoading]);

  return {
    normalizedBalance,
    loading: balanceLoading || decimalLoading,
    error: balanceError || decimalError,
  };
};

export default useNormalizedBalance;
