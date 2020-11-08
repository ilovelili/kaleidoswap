import { useCallback } from 'react'

import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'

import { leave, getXSushiStakingContract } from '../sushi/utils'

const useLeave = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXSushiStakingContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return { onLeave: handle }
}

export default useLeave
