import kaleidoBakeryMainnet from './mainnet/kaleidoswap.json'
import TokensMainnet from './mainnet/tokens.json'

import kaleidoBakeryRinkeby from './rinkeby/kaleidoswap.json'
import TokensRinkeby from './rinkeby/tokens.json'

const mainnet = {
  kaleidoBakery: kaleidoBakeryMainnet.KaleidoBakery,
  kaleidoToken: TokensMainnet.KaleidoToken,
  Weth: TokensMainnet.Weth,
  LP_ethDai: TokensMainnet.LiquidityProvider.ethDai,
}

const rinkeby = {
  kaleidoBakery: kaleidoBakeryRinkeby.KaleidoBakery,
  kaleidoToken: TokensRinkeby.KaleidoToken,
  Weth: TokensRinkeby.Weth,
  LP_ethDai: TokensRinkeby.LiquidityProvider.ethDai,
}

const network = process.env.REACT_APP_NETWORK
console.log(`using ${network} addresses`)

export default (() => {
  switch (network.toLowerCase()) {
    case 'mainnet':
      return mainnet
    case 'rinkeby':
      return rinkeby
    default:
      return {}
  }
})()
