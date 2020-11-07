import { useContext } from 'react'
import { Context } from '../contexts/BakeryProvider'

const useSushi = () => {
  const { sushi } = useContext(Context)
  return sushi
}

export default useSushi
