import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useKaleido from './useKaleido'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getAllowance } from '../utils/erc20'
import { getTokenContract, getXSushiStakingContract } from '../kaleido/utils'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const lpContract = getSushiContract(sushi)
  const stakingContract = getXSushiStakingContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      stakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, stakingContract, lpContract])

  useEffect(() => {
    if (account && stakingContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, stakingContract, lpContract])

  return allowance
}

export default useAllowanceStaking
