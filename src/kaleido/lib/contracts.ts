import { KaleidoOptions } from '../Kaleido'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { ContractAddresses, Pool, SupportedPools } from '../pool'
import { SUBTRACT_GAS_LIMIT } from './constants'
import { AbiItem } from 'web3-utils'

import ERC20Abi from '../../abis/ERC20.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import WETHAbi from './abi/weth.json'
import KaleidoBakeryAbi from '../../abis/KaleidoBakery.json'
import KaleidoTokenAbi from '../../abis/KaleidoToken.json'
import { typeProvider } from '../../utils/typeProvider'

export const ConfirmationType = {
  Hash: 0,
  Confirmed: 1,
  Both: 2,
  Simulate: 3,
}

export class Contracts {
  web3: Web3
  defaultConfirmations: number
  autoGasMultiplier: number
  confirmationType: number
  defaultGas: string
  defaultGasPrice: string
  blockGasLimit: number
  pools: Pool[]

  kaleidoToken: Contract
  kaleidoBakery: Contract
  weth: Contract

  constructor(provider: typeProvider, web3: Web3, options: KaleidoOptions) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.kaleidoToken = new this.web3.eth.Contract(
      (KaleidoTokenAbi.abi as unknown) as AbiItem,
    )
    this.kaleidoBakery = new this.web3.eth.Contract(
      (KaleidoBakeryAbi.abi as unknown) as AbiItem,
    )
    this.weth = new this.web3.eth.Contract((WETHAbi as unknown) as AbiItem)

    this.pools = SupportedPools.map((pool) =>
      Object.assign(pool, {
        lpAddress: pool.lpAddress,
        tokenAddress: pool.tokenAddress,
        lpContract: new this.web3.eth.Contract(
          (UNIV2PairAbi as unknown) as AbiItem,
        ),
        tokenContract: new this.web3.eth.Contract(
          (ERC20Abi.abi as unknown) as AbiItem,
        ),
      }),
    )

    this.setProvider(provider)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider: typeProvider) {
    this.web3.setProvider(provider)

    this.kaleidoToken.options.address = ContractAddresses.kaleidoToken
    this.kaleidoBakery.options.address = ContractAddresses.kaleidoBakery
    this.weth.options.address = ContractAddresses.weth

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
        lpContract.options.address = lpAddress
        tokenContract.options.address = tokenAddress
      },
    )
  }

  setDefaultAccount(account: string) {
    this.kaleidoToken.options.from = account
    this.kaleidoBakery.options.from = account
  }

  async callContractFunction(method: any, options: any) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (this.defaultGas && confirmationType !== ConfirmationType.Simulate) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (t === ConfirmationType.Hash || t === ConfirmationType.Both) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error: Error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash: string) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (t === ConfirmationType.Confirmed || t === ConfirmationType.Both) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error: Error) => {
          if (
            (t === ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber: number, receipt: string) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt: string) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      return { transactionHash }
    }

    if (t === ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method: any, options: any) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
