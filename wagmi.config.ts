import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { sepolia, mainnet } from "wagmi/chains";

export default defineConfig({
    out: "generated.ts",
    contracts: [
        {
            name: "erc20",
            abi: erc20Abi,
        },
    ],
    plugins: [
        etherscan({
            apiKey: process.env.ETHERSCAN_API_KEY!,
            chainId: mainnet.id,
            contracts: [
                {
                    name: "PRTC",
                    address: {[mainnet.id]: "0xb9098D3669A78e9AfE8b94a97290407400D9dA31",
                },
                },
                {
                    name: "Zaar",
                    address: {
                        
                        [mainnet.id]:
                            "0x95AC17CE4021417E25B8eDF807366fC3bE091B5E",
                    },
                },{
                    name: "xPRTC",
                    address: {
                        [mainnet.id]:
                            "0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7",
                    },
                },
            ],
        }),
        react(),
    ],
});