// KALEIDOSWAP SETTINGS
export const CHAIN_ID = 4
export const contractAddresses = {
  sushi: {
    1: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
    4: '0xecD246d5Dac3Cd49DfA0144Aea1439a4C4074B64',
  },
  masterChef: {
    1: '0xc2edad668740f1aa35e4d8f227fb8e17dca888cd',
    4: '0x4533060563B89c986d8f838f503c6bD2C9F383E7',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    4: '0xc778417e063141139fce010982780140aa0cd5ab',
  },
  xSushi: {
    1: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
    4: '0x8798249c2e607446efb7ad49ec89dd1865ff4272', // NOTE: Not in use
  },
}

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      4: '0x03e6c12ef405ac3f642b9184eded8e1322de1a9e', // LP Token Address
    },
    tokenAddresses: {
      4: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2', // Sushi Token
    },
    name: 'Strawberry Cheese',
    symbol: 'DAI-ETH LP',
    tokenSymbol: 'DAI',
    icon: '🍰',
  },
]
