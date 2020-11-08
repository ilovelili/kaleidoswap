import { useCallback, useEffect, useRef, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { getEarned, getBakeryContract, getFarms } from '../kaleido/utils'
import useKaleido from './useKaleido'
import useIsMounted from './useIsMounted'

const useAllEarnings = () => {
  const isMounted = useIsMounted()
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kaleido = useKaleido()
  const farms = getFarms(kaleido)
  const bakeryContract = getBakeryContract(kaleido)

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(bakeryContract, pid, account),
      ),
    )
    if (isMounted()) {
      setBalance(balances)
    }
  }, [farms, account, bakeryContract, setBalance, isMounted])

  useEffect(() => {
    if (account && bakeryContract && kaleido) {
      fetchAllBalances()
    }
  }, [account, bakeryContract, kaleido, fetchAllBalances])

  return balances
}

export default useAllEarnings
