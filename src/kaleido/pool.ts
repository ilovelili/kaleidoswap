import addresses from '../addresses'
import { Contract } from 'web3-eth-contract'
import web3 from 'web3'

export interface Pool {
  pid: number
  lpAddress: string
  tokenAddress: string
  name: string
  symbol: string
  tokenSymbol: string
  icon: string
  lpContract?: Contract
  tokenContract?: Contract
}

// Todo: add all supported pools here
export const SupportedPools: Pool[] = [
  // {
  //   pid: 1,
  //   lpAddress: addresses.LP_ethKaleido,
  //   tokenAddress: addresses.Kaleido,
  //   name: 'KALEIDO Donuts',
  //   symbol: 'KALIEOD-ETH LP',
  //   tokenSymbol: 'KALEIDO',
  //   icon: '🍩',
  // },
  {
    pid: 0,
    lpAddress: addresses.LP_ethDai,
    tokenAddress: addresses.Dai,
    name: 'DAI Strawberry',
    symbol: 'DAI-ETH LP',
    tokenSymbol: 'DAI',
    icon: '🍰',
  },
  // {
  //   pid: 2,
  //   lpAddress: addresses.LP_ethUsdt,
  //   tokenAddress: addresses.Usdt,
  //   name: 'USDT Soft Cream',
  //   symbol: 'USDT-ETH LP',
  //   tokenSymbol: 'USDT',
  //   icon: '🍦',
  // },
]

export const ContractAddresses = {
  kaleidoToken: web3.utils.toChecksumAddress(addresses.Kaleido),
  kaleidoBakery: web3.utils.toChecksumAddress(addresses.kaleidoBakery),
  weth: web3.utils.toChecksumAddress(addresses.Weth),
}
