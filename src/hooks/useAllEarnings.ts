import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getBakeryContract, getFarms } from '../kaleido/utils'
import useKaleido from './useKaleido'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kaleido = useKaleido()
  const farms = getFarms(kaleido)
  const bakeryContract = getBakeryContract(kaleido)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(bakeryContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [farms, account, bakeryContract])

  useEffect(() => {
    if (account && bakeryContract && kaleido) {
      fetchAllBalances()
    }
  }, [account, block, bakeryContract, setBalance, kaleido, fetchAllBalances])

  return balances
}

export default useAllEarnings
