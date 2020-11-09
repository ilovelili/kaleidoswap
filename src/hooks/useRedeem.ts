import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeem } from '../kaleido/utils'

const useRedeem = (bakeryContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeem(bakeryContract, account)
    console.log(txHash)
    return txHash
  }, [bakeryContract, account])

  return { onRedeem: handleRedeem }
}

export default useRedeem
