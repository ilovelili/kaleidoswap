export const resolveChainID = (network: string) => {
  switch (network.toLowerCase()) {
    case 'mainnet':
      return 1
    case 'ropsten':
      return 3
    case 'rinkeby':
      return 4
    case 'kovan':
      return 42
    default:
      return 1337 // dev
  }
}

export const resolveNetwork = (networkId: number) => {
  switch (networkId) {
    case 1:
      return 'mainnet'
    case 3:
      return 'ropsten'
    case 4:
      return 'rinkeby'
    case 42:
      return 'kovan'
    default:
      return 'local'
  }
}

export default resolveChainID
