import { useCallback } from 'react'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { unstake, getBakeryContract } from '../kaleido/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const kaleido = useKaleido()
  const bakeryContract = getBakeryContract(kaleido)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(bakeryContract, pid, amount, account)
      console.log(txHash)
    },
    [bakeryContract, pid, account, unstake],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
