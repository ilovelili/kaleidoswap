import { useContext } from 'react'
import { Context } from '../contexts/KaleidoProvider'

const useKaleido = () => {
  const { kaleido } = useContext(Context)
  return kaleido
}

export default useKaleido
