import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { Contract } from 'web3-eth-contract'
import config from '../config.json'
import { Kaleido } from './Kaleido'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getBakeryAddress = (kaleido: Kaleido) => {
  return kaleido && kaleido.bakeryAddress
}
export const getTokenAddress = (kaleido: Kaleido) => {
  return kaleido && kaleido.tokenAddress
}
export const getWethContract = (kaleido: Kaleido) => {
  return kaleido?.contracts?.weth
}

export const getBakeryContract = (kaleido: Kaleido) => {
  return kaleido?.contracts?.kaleidoBakery
}

export const getTokenContract = (kaleido: Kaleido) => {
  return kaleido?.contracts?.kaleidoToken
}

export const getFarms = (kaleido: Kaleido) => {
  return (
    kaleido?.contracts?.pools?.map(
      ({
        pid,
        name,
        symbol,
        icon,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        lpAddress,
        lpContract,
      }) => ({
        pid,
        id: symbol,
        name,
        lpToken: symbol,
        lpTokenAddress: lpAddress,
        lpContract,
        tokenAddress,
        tokenSymbol,
        tokenContract,
        earnToken: 'KALEIDO',
        earnTokenAddress: kaleido.contracts.kaleidoToken.options.address,
        icon,
      }),
    ) || []
  )
}

export const getPoolWeight = async (kaleidoBakery: Contract, pid: number) => {
  const { allocPoint } = await kaleidoBakery.methods.poolInfo(pid).call()
  const totalAllocPoint = await kaleidoBakery.methods.totalAllocPoint().call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (
  kaleidoBakery: Contract,
  pid: number,
  account: string,
) => {
  return kaleidoBakery.methods.pendingKaleido(pid, account).call()
}

export const getTotalLPWethValue = async (
  kaleidoBakery: Contract,
  weth: Contract,
  lpContract: Contract,
  tokenContract: Contract,
  pid: number,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

  const tokenDecimals = await tokenContract.methods.decimals().call()

  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(kaleidoBakery.options.address)
    .call()

  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  // Get total weth value for the lpContract = w1
  const lpContractWeth = await weth.methods
    .balanceOf(lpContract.options.address)
    .call()

  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))

  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))

  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(kaleidoBakery, pid),
  }
}

export const approve = async (
  lpContract: Contract,
  kaleidoBakery: Contract,
  account: string,
) => {
  return lpContract.methods
    .approve(kaleidoBakery.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (
  lpContract: Contract,
  address: string,
  account: string,
) => {
  return lpContract.methods
    .approve(address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getKaleidoTokenSupply = async (kaleido: Kaleido) => {
  return new BigNumber(
    await kaleido.contracts.kaleidoToken.methods.totalSupply().call(),
  )
}

export const stake = async (
  kaleidoBakery: Contract,
  pid: number,
  amount: number,
  account: string,
) => {
  return kaleidoBakery.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (
  kaleidoBakery: Contract,
  pid: number,
  amount: number,
  account: string,
) => {
  return kaleidoBakery.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const harvest = async (
  kaleidoBakery: Contract,
  pid: number,
  account: string,
) => {
  return kaleidoBakery.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (
  kaleidoBakery: Contract,
  pid: number,
  account: string,
) => {
  try {
    const { amount } = await kaleidoBakery.methods.userInfo(pid, account).call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (kaleidoBakery: Contract, account: string) => {
  let now = new Date().getTime()
  // redeem_activite_timestamp is set to Dec 01 2020 at 00:00:000
  if (now >= config.redeem_activite_timestamp) {
    return kaleidoBakery.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const enter = async (
  contract: Contract,
  amount: number,
  account: string,
) => {
  debugger
  return contract.methods
    .enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const leave = async (
  contract: Contract,
  amount: number,
  account: string,
) => {
  return contract.methods
    .leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx: any) => {
      console.log(tx)
      return tx.transactionHash
    })
}
