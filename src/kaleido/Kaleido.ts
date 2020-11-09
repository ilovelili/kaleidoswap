import Web3 from 'web3'
import { AddAccount } from 'web3-core'
import { typeProvider } from '../utils/typeProvider'
import { Contracts } from './lib/contracts'
import { ContractAddresses } from './pool'

export interface KaleidoOptions {
  ethereumNodeTimeout?: number
  defaultAccount?: string
  defaultConfirmations?: number
  autoGasMultiplier?: number
  confirmationType?: number
  defaultGas?: string
  defaultGasPrice?: string
  accounts?: any[]
}

export class Kaleido {
  web3: Web3
  contracts: Contracts
  tokenAddress: string
  bakeryAddress: string
  wethAddress: string

  constructor(provider: typeProvider, options: KaleidoOptions) {
    var realProvider

    if (typeof provider === 'string') {
      if (provider.includes('wss')) {
        realProvider = new Web3.providers.WebsocketProvider(provider, {
          timeout: options.ethereumNodeTimeout || 10000,
        })
      } else {
        realProvider = new Web3.providers.HttpProvider(provider, {
          timeout: options.ethereumNodeTimeout || 10000,
        })
      }
    } else {
      realProvider = provider
    }

    this.web3 = new Web3(realProvider)

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }

    this.contracts = new Contracts(realProvider, this.web3, options)
    this.tokenAddress = ContractAddresses.kaleidoToken
    this.bakeryAddress = ContractAddresses.kaleidoBakery
    this.wethAddress = ContractAddresses.weth
  }

  setProvider(provider: typeProvider) {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider)
  }

  setDefaultAccount(account: string) {
    this.web3.eth.defaultAccount = account
    this.contracts.setDefaultAccount(account)
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount
  }

  loadAccount(account: AddAccount) {
    const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey)

    if (
      !newAccount ||
      (account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase())
    ) {
      throw new Error(
        `Loaded account address mismatch. Expected ${account.address}, got ${
          newAccount ? newAccount.address : null
        }`,
      )
    }
  }
}
