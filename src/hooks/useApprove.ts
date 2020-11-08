import { useCallback } from 'react'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { approve, getBakeryContract } from '../kaleido/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kaleido = useKaleido()
  const kaleidoContract = getBakeryContract(kaleido)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, kaleidoContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, kaleidoContract, approve])

  return { onApprove: handleApprove }
}

export default useApprove
