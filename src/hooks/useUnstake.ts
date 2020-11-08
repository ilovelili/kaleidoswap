import { useCallback } from 'react'

import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../sushi/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, masterChefContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
