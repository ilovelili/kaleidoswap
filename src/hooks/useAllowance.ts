import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { getAllowance } from '../utils/erc20'
import { getBakeryContract } from '../kaleido/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const kaleido = useKaleido()
  const bakeryContract = getBakeryContract(kaleido)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      bakeryContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, bakeryContract, lpContract, getAllowance, setAllowance])

  useEffect(() => {
    if (account && bakeryContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, bakeryContract, lpContract, fetchAllowance])

  return allowance
}

export default useAllowance
