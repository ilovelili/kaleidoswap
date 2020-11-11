import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getEarned, getBakeryContract } from '../kaleido/utils'
import useKaleido from './useKaleido'

const useEarnings = (pid: number, interval: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const kaleido = useKaleido()
  const bakeryContract = getBakeryContract(kaleido)

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(bakeryContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [bakeryContract, pid, account, setBalance])

  useEffect(() => {
    if (account && bakeryContract && kaleido) {
      fetchBalance()
      if (interval) {
        setInterval(fetchBalance, interval)
      }
    }
  }, [account, bakeryContract, kaleido, fetchBalance])

  return balance
}

export default useEarnings
