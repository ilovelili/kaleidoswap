const resolveChainID = (network: string) => {
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
      return 1337 //dev
  }
}

export default resolveChainID
