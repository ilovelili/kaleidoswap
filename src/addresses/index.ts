import kaleidoBakeryMainnet from './mainnet/kaleidoswap.json'
import TokensMainnet from './mainnet/tokens.json'

import kaleidoBakeryRinkeby from './rinkeby/kaleidoswap.json'
import TokensRinkeby from './rinkeby/tokens.json'

const mainnet = {
  kaleidoBakery: kaleidoBakeryMainnet.KaleidoBakery,
  kaleidoToken: TokensMainnet.KaleidoToken,
  Weth: TokensMainnet.Weth,
  Dai: TokensMainnet.Dai,
  LP_ethDai: TokensMainnet.LiquidityProvider.ethDai,
  LP_ethKaleido: TokensRinkeby.LiquidityProvider.ethKaleido,
}

const rinkeby = {
  kaleidoBakery: kaleidoBakeryRinkeby.KaleidoBakery,
  kaleidoToken: TokensRinkeby.KaleidoToken,
  Weth: TokensRinkeby.Weth,
  Dai: TokensRinkeby.Dai,
  LP_ethDai: TokensRinkeby.LiquidityProvider.ethDai,
  LP_ethKaleido: TokensRinkeby.LiquidityProvider.ethKaleido,
}

const network = process.env.REACT_APP_NETWORK
console.log(`using ${network} addresses`)

const addresses = (() => {
  switch (network.toLowerCase()) {
    case 'mainnet':
      return mainnet
    case 'rinkeby':
      return rinkeby
    default:
      console.error('Network not supported!')
      return {
        kaleidoBakery: '',
        kaleidoToken: '',
        Weth: '',
        Dai: '',
        LP_ethDai: '',
        LP_ethKaleido: '',
      }
  }
})()

export default addresses
