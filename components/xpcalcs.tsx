
import { createThirdwebClient } from "thirdweb";
import { getContract } from "thirdweb";
import { ethereum } from "thirdweb/chains";
import { readContract } from "thirdweb";
 

const client = createThirdwebClient({
    secretKey: "-1-LhFSJ3d4J05E3DmqpVNs_boIaC6mmGoe0Drt26wkJW0KP8k-A3ZE1oFXTIPFRv30cBmBv6_CqmesUfrDT2w",
});

const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    chain: ethereum,
    // the contract's address
    address: "0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7",
  });


export const xpcalcs = (address: string) => {
    async function getXp(){
     const balance = await readContract({
        contract: contract,
        method: "function previewRewards(address user) public view returns (uint256)",
        params: [address],
      }); 
    return balance;
    }
    return getXp();
};