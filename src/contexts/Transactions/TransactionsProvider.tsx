import React, { useCallback, useEffect, useReducer } from 'react'

import Context from './context'
import reducer, {
  initialState,
  setTransactions,
  addTransaction,
} from './reducer'
import { Transaction, TransactionsMap } from './types'

const TransactionsProvider: React.FC = ({ children }) => {
  const [{ initialized, transactions }, dispatch] = useReducer(
    reducer,
    initialState,
  )

  const handleAddTransaction = useCallback(
    (tx: Transaction) => {
      dispatch(addTransaction(tx))
    },
    [dispatch, addTransaction],
  )

  const fetchTransactions = useCallback(async () => {
    try {
      const txsRaw = localStorage.getItem('transactions')
      const txs = (JSON.parse(txsRaw) as TransactionsMap) || {}
      dispatch(setTransactions(txs))
    } catch (e) {
      console.log(e)
    }
  }, [dispatch, setTransactions])

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    }
  }, [initialized, transactions])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <Context.Provider
      value={{
        transactions,
        onAddTransaction: handleAddTransaction,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default TransactionsProvider
