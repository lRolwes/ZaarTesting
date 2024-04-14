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
            apiKey: "Process.env.ETHERSCAN_API_KEY!",
            chainId: mainnet.id,
            contracts: [
                {
                    name: "PRTC",
                    address: {
                        [sepolia.id]: 
                            '0x3604e94d1208c16a805f1be2e0c94199295ff4e4',
                        [mainnet.id]:
                            "0xb9098D3669A78e9AfE8b94a97290407400D9dA31",
                    },
                },
                {
                    name: "Zaar",
                    address: {
                        [sepolia.id]: 
                            '0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a',
                        [mainnet.id]:
                            "0x95AC17CE4021417E25B8eDF807366fC3bE091B5E",
                    },
                },{
                    name: "xPRTC",
                    address: {
                        [sepolia.id]: 
                            '0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7',
                        [mainnet.id]:
                            "0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7",
                    },
                },
            ],
        }),
        react(),
    ],
});
