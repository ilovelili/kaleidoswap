import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getStaked, getBakeryContract } from '../kaleido/utils'
import useKaleido from './useKaleido'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const kaleido = useKaleido()
  const bakeryContract = getBakeryContract(kaleido)

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(bakeryContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [bakeryContract, pid, account, getStaked, setBalance])

  useEffect(() => {
    if (account && kaleido) {
      fetchBalance()
    }
  }, [account, kaleido, fetchBalance])

  return balance
}

export default useStakedBalance
