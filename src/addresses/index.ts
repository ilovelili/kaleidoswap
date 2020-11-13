import kaleidoBakeryMainnet from './mainnet/kaleidoswap.json'
import TokensMainnet from './mainnet/tokens.json'

import kaleidoBakeryRinkeby from './rinkeby/kaleidoswap.json'
import TokensRinkeby from './rinkeby/tokens.json'

import web3 from 'web3'

const addresses = () => {
  let kaleidoBakery, tokens
  const network = process.env.REACT_APP_NETWORK
  console.log(`using ${network} addresses`)

  switch (network.toLowerCase()) {
    case 'mainnet':
      kaleidoBakery = kaleidoBakeryMainnet
      tokens = TokensMainnet
      break
    case 'rinkeby':
      kaleidoBakery = kaleidoBakeryRinkeby
      tokens = TokensRinkeby
      break
    default:
      console.error('Network not supported!')
  }

  const checksum = (address: string) => {
    try {
      return web3.utils.toChecksumAddress(address)
    } catch {
      return address // since some addresses are not configured yet
    }
  }

  return {
    kaleidoBakery: checksum(kaleidoBakery.KaleidoBakery),
    Weth: checksum(tokens.Weth),
    Dai: checksum(tokens.Dai),
    Kaleido: checksum(tokens.Kaleido),
    Usdt: checksum(tokens.Usdt),
    LP_ethDai: checksum(tokens.LiquidityProvider.ethDai),
    LP_ethKaleido: checksum(tokens.LiquidityProvider.ethKaleido),
    LP_ethUsdt: checksum(tokens.LiquidityProvider.ethUsdt),
    LP_ethUsdc: checksum(tokens.LiquidityProvider.ethUsdc),
    LP_ethSusd: checksum(tokens.LiquidityProvider.ethSusd),
    LP_ethUma: checksum(tokens.LiquidityProvider.ethUma),
    LP_ethBand: checksum(tokens.LiquidityProvider.ethBand),
    LP_ethLink: checksum(tokens.LiquidityProvider.ethLink),
    LP_ethCompound: checksum(tokens.LiquidityProvider.ethCompound),
    LP_ethLend: checksum(tokens.LiquidityProvider.ethLend),
  }
}

export default addresses()

/**
 * SLP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
 */
