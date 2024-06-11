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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const prtcAddress = {
  1: '0xb9098D3669A78e9AfE8b94a97290407400D9dA31',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const prtcConfig = { address: prtcAddress, abi: prtcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StakingRewards
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const stakingRewardsAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_prtc', internalType: 'contract IERC20', type: 'address' },
      { name: '_weth', internalType: 'contract IERC20', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'CannotStakeZeroTokens' },
  { type: 'error', inputs: [], name: 'NoStakers' },
  { type: 'error', inputs: [], name: 'NotStaked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CapturedRewards',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsPayout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsToTreasury',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UserStaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UserUnstaked',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'previewRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'rewardsPerStakedToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakingRecords',
    outputs: [
      { name: 'stakedAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'rewardsPerStakedTokenSnapshot',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'weth',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const stakingRewardsAddress = {
  1: '0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const stakingRewardsConfig = {
  address: stakingRewardsAddress,
  abi: stakingRewardsAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Zaar
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const zaarAddress = {
  1: '0x95AC17CE4021417E25B8eDF807366fC3bE091B5E',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
// xPRTC
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const xPrtcAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_prtc', internalType: 'contract IERC20', type: 'address' },
      { name: '_weth', internalType: 'contract IERC20', type: 'address' },
      { name: '_treasury', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'CannotStakeZeroTokens' },
  { type: 'error', inputs: [], name: 'NoStakers' },
  { type: 'error', inputs: [], name: 'NotStaked' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CapturedRewards',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsPayout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RewardsToTreasury',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UserStaked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'who', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'UserUnstaked',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimRewards',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'previewRewards',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
    name: 'rewardsPerStakedToken',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'stakingRecords',
    outputs: [
      { name: 'stakedAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'rewardsPerStakedTokenSnapshot',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalStaked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'weth',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const xPrtcAddress = {
  1: '0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7',
} as const

/**
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const xPrtcConfig = { address: xPrtcAddress, abi: xPrtcAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtc = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcAllowance = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcDecimals = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcName = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcSymbol = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useReadPrtcTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWritePrtc = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWritePrtcApprove = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWritePrtcTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWritePrtcTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useSimulatePrtc = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useSimulatePrtcApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useSimulatePrtcTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: prtcAbi,
  address: prtcAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link prtcAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWatchPrtcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: prtcAbi,
  address: prtcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link prtcAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xb9098D3669A78e9AfE8b94a97290407400D9dA31)
 */
export const useWatchPrtcTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: prtcAbi,
    address: prtcAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewards = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardsAbi,
  address: stakingRewardsAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"previewRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsPreviewRewards =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'previewRewards',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"prtc"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsPrtc = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardsAbi,
  address: stakingRewardsAddress,
  functionName: 'prtc',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"rewardsPerStakedToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsRewardsPerStakedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'rewardsPerStakedToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"stakingRecords"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsStakingRecords =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'stakingRecords',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"totalStaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsTotalStaked =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'totalStaked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"treasury"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsTreasury =
  /*#__PURE__*/ createUseReadContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'treasury',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"weth"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadStakingRewardsWeth = /*#__PURE__*/ createUseReadContract({
  abi: stakingRewardsAbi,
  address: stakingRewardsAddress,
  functionName: 'weth',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteStakingRewards = /*#__PURE__*/ createUseWriteContract({
  abi: stakingRewardsAbi,
  address: stakingRewardsAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"claimRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteStakingRewardsClaimRewards =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'claimRewards',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"distribute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteStakingRewardsDistribute =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteStakingRewardsStake = /*#__PURE__*/ createUseWriteContract(
  {
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'stake',
  },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteStakingRewardsUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateStakingRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"claimRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateStakingRewardsClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'claimRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"distribute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateStakingRewardsDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateStakingRewardsStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingRewardsAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateStakingRewardsUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__ and `eventName` set to `"CapturedRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsCapturedRewardsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    eventName: 'CapturedRewards',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__ and `eventName` set to `"RewardsPayout"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsRewardsPayoutEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    eventName: 'RewardsPayout',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__ and `eventName` set to `"RewardsToTreasury"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsRewardsToTreasuryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    eventName: 'RewardsToTreasury',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__ and `eventName` set to `"UserStaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsUserStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    eventName: 'UserStaked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link stakingRewardsAbi}__ and `eventName` set to `"UserUnstaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchStakingRewardsUserUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: stakingRewardsAbi,
    address: stakingRewardsAddress,
    eventName: 'UserUnstaked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaar = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"allowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarAllowance = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decimals"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarDecimals = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"name"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarName = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"prtc"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarPrtc = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'prtc',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"symbol"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarSymbol = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"totalSupply"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useReadZaarTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWriteZaar = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWriteZaarApprove = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"bridge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWriteZaarBridge = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'bridge',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWriteZaarTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWriteZaarTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useSimulateZaar = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"approve"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useSimulateZaarApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"bridge"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useSimulateZaarBridge = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'bridge',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"decreaseAllowance"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useSimulateZaarTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: zaarAbi,
  address: zaarAddress,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link zaarAbi}__ and `functionName` set to `"transferFrom"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
 */
export const useWatchZaarEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: zaarAbi,
  address: zaarAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link zaarAbi}__ and `eventName` set to `"Approval"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0x95AC17CE4021417E25B8eDF807366fC3bE091B5E)
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

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtc = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"balanceOf"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"previewRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcPreviewRewards = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'previewRewards',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"prtc"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcPrtc = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'prtc',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"rewardsPerStakedToken"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcRewardsPerStakedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    functionName: 'rewardsPerStakedToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"stakingRecords"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcStakingRecords = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'stakingRecords',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"totalStaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcTotalStaked = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'totalStaked',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"treasury"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcTreasury = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'treasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"weth"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useReadXPrtcWeth = /*#__PURE__*/ createUseReadContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'weth',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link xPrtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteXPrtc = /*#__PURE__*/ createUseWriteContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"claimRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteXPrtcClaimRewards = /*#__PURE__*/ createUseWriteContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'claimRewards',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"distribute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteXPrtcDistribute = /*#__PURE__*/ createUseWriteContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'distribute',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteXPrtcStake = /*#__PURE__*/ createUseWriteContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'stake',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWriteXPrtcUnstake = /*#__PURE__*/ createUseWriteContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'unstake',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link xPrtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateXPrtc = /*#__PURE__*/ createUseSimulateContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"claimRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateXPrtcClaimRewards =
  /*#__PURE__*/ createUseSimulateContract({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    functionName: 'claimRewards',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"distribute"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateXPrtcDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"stake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateXPrtcStake = /*#__PURE__*/ createUseSimulateContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'stake',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link xPrtcAbi}__ and `functionName` set to `"unstake"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useSimulateXPrtcUnstake = /*#__PURE__*/ createUseSimulateContract({
  abi: xPrtcAbi,
  address: xPrtcAddress,
  functionName: 'unstake',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: xPrtcAbi,
  address: xPrtcAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__ and `eventName` set to `"CapturedRewards"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcCapturedRewardsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    eventName: 'CapturedRewards',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__ and `eventName` set to `"RewardsPayout"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcRewardsPayoutEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    eventName: 'RewardsPayout',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__ and `eventName` set to `"RewardsToTreasury"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcRewardsToTreasuryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    eventName: 'RewardsToTreasury',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__ and `eventName` set to `"UserStaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcUserStakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    eventName: 'UserStaked',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link xPrtcAbi}__ and `eventName` set to `"UserUnstaked"`
 *
 * [__View Contract on Ethereum Etherscan__](https://etherscan.io/address/0xEE9Bf5aAdBfb8E7E7dD4098915043edd36cE26f7)
 */
export const useWatchXPrtcUserUnstakedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: xPrtcAbi,
    address: xPrtcAddress,
    eventName: 'UserUnstaked',
  })
