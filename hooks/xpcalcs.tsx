import { useState, useEffect } from "react";
import {
  useAccount,
} from "wagmi";
import {
  useReadStakingRewardsPreviewRewards,
} from "../generated";
import{
  formatEther,
} from "viem";

const useXP = () => {
  const { address } = useAccount();
  const {data: xpcalcs, refetch: refetchXpcalcs} = useReadStakingRewardsPreviewRewards(
    {args: [address ? address: "0x0000000000000000000000000000000000000000"] });

  function refetchXp() {
    refetchXpcalcs();
  }

  return {
    xpcalcs
  };
};

export default useXP;