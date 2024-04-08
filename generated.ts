import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PRTC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const prtcAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const prtcAddress = {
  11155111: '0x3604E94d1208C16a805f1Be2e0C94199295FF4E4',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const prtcConfig = { address: prtcAddress, abi: prtcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Zaar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const zaarAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_prtc', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'bridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'prtc',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const zaarAddress = {
  11155111: '0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a',
} as const

/**
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const zaarConfig = { address: zaarAddress, abi: zaarAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtc = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcName = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useReadPrtcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtc = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtcDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: prtcAbi,
    address: prtcAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtcIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: prtcAbi,
    address: prtcAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWritePrtcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtc = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtcDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: prtcAbi,
    address: prtcAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtcIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: prtcAbi,
    address: prtcAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useSimulatePrtcTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: prtcAbi,
    address: prtcAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWatchPrtcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link prtcAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWatchPrtcApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: prtcAbi,
    address: prtcAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link prtcAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0x3604e94d1208c16a805f1be2e0c94199295ff4e4)
 */
export const useWatchPrtcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: prtcAbi,
    address: prtcAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaar = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarAllowance = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarDecimals = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarName = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"prtc"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarPrtc = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'prtc',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarSymbol = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useReadZaarTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaar = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarApprove = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"bridge"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarBridge = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'bridge',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarDecreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarAbi,
    address: zaarAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarIncreaseAllowance =
  /*#__PURE__*/ createUseWriteContract({
    abi: zaarAbi,
    address: zaarAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWriteZaarTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaar = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"bridge"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarBridge = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'bridge',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarDecreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarAbi,
    address: zaarAddress,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"increaseAllowance"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarIncreaseAllowance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarAbi,
    address: zaarAddress,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useSimulateZaarTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: zaarAbi,
    address: zaarAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWatchZaarEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWatchZaarApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarAbi,
    address: zaarAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarAbi}__ and `eventName` set to `"Transfer"`
 *
 * [__View Contract on Sepolia Etherscan__](https://sepolia.etherscan.io/address/0xf24D176D55d3a0E76D6dDaD7d5e9BB68518aCE5a)
 */
export const useWatchZaarTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: zaarAbi,
    address: zaarAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
