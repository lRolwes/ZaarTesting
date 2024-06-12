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
import { getAccount } from '@wagmi/core'
import { config } from './../config'
const useXP = () => {
  const { address } = useAccount();
  const addr = getAccount(config).address;
  const [rewards, setRewards] = useState(0);
  const getRewards = async (): Promise<void> => {
    //const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

    const response = await fetch(
      `/api/getRewards?ownerAddress=${addr}`
    );
    let userData= await response.json();
    console.log(userData);
    setRewards(userData?.rewards || 0);

  };
  useEffect(() => {
    getRewards();
  }, []);

  return {
    xpcalcs:rewards
  };
};

export default useXP;