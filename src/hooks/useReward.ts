import { useCallback } from 'react'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { harvest, getBakeryContract } from '../kaleido/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const kaleido = useKaleido()
  const bakeryContract = getBakeryContract(kaleido)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(bakeryContract, pid, account)
    console.log(txHash)
    return txHash
  }, [bakeryContract, pid, account, harvest])

  return { onReward: handleReward }
}

export default useReward
