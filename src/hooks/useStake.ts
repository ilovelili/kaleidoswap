import { useCallback } from 'react'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { stake, getBakeryContract } from '../kaleido/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const kaleido = useKaleido()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getBakeryContract(kaleido),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [kaleido, pid, account],
  )

  return { onStake: handleStake }
}

export default useStake
