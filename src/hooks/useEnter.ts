import { useCallback } from 'react'

import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'

import { enter, getXSushiStakingContract } from '../sushi/utils'

const useEnter = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXSushiStakingContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return { onEnter: handle }
}

export default useEnter
