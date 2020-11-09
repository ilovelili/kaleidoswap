import {
  AbstractProvider,
  HttpProvider,
  IpcProvider,
  WebsocketProvider,
} from 'web3-core'

export type typeProvider =
  | HttpProvider
  | IpcProvider
  | WebsocketProvider
  | AbstractProvider
  | string
  | null
