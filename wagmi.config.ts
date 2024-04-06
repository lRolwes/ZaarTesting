import { defineConfig } from '@wagmi/cli'
import { etherscan, react } from '@wagmi/cli/plugins'
import { erc20Abi} from 'viem'
import { mainnet, sepolia } from 'wagmi/chains'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
  ],
  plugins: [
    etherscan({
      apiKey:   process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: 'Zaar',
          address: {
            [sepolia.id]: '0x3604e94d1208c16a805f1be2e0c94199295ff4e4',
          },
        },
      ],
    }),
    react(),
  ],
})