import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import {
  getBakeryContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from '../kaleido/utils'
import useKaleido from './useKaleido'
import useIsMounted from './useIsMounted'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kaleido = useKaleido()
  const farms = getFarms(kaleido)
  const bakeryContract = getBakeryContract(kaleido)
  const wethContact = getWethContract(kaleido)
  const isMounted = useIsMounted()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue(
            bakeryContract,
            wethContact,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    if (isMounted()) {
      setBalance(balances)
    }
  }, [farms, bakeryContract, wethContact, setBalance, isMounted])

  useEffect(() => {
    if (account && bakeryContract && kaleido) {
      fetchAllStakedValue()
    }
  }, [account, bakeryContract, kaleido, fetchAllStakedValue])

  return balances
}

export default useAllStakedValue
