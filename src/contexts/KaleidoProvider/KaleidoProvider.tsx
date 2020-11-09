import React, { createContext, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { Kaleido } from '../../kaleido'

export interface KaleidoContext {
  kaleido?: Kaleido
}

export const Context = createContext<KaleidoContext>({
  kaleido: undefined,
})

const KaleidoProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [kaleido, setKaleido] = useState<any>()

  // @ts-ignore
  window.kaleido = kaleido
  // @ts-ignore

  useEffect(() => {
    if (ethereum) {
      setKaleido(
        new Kaleido(ethereum, {
          defaultAccount: ethereum.selectedAddress,
          defaultConfirmations: 1,
          autoGasMultiplier: 1.5,
          defaultGas: '6000000',
          defaultGasPrice: '1000000000000',
          accounts: [],
          ethereumNodeTimeout: 10000,
        }),
      )
    }
  }, [ethereum, setKaleido])

  return <Context.Provider value={{ kaleido }}>{children}</Context.Provider>
}

export default KaleidoProvider
