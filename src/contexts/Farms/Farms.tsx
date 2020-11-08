import React, { useState } from 'react'
import useKaleido from '../../hooks/useKaleido'
import { getFarms } from '../../kaleido/utils'
import Context from './context'

const Farms: React.FC = ({ children }) => {
  const [unharvested] = useState(0)
  const sushi = useKaleido()
  const farms = getFarms(sushi)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
