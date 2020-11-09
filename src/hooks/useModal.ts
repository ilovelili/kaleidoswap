import { useCallback, useContext } from 'react'
import { Context } from '../contexts/Modals'

const useModal = (modal: React.ReactNode, key?: string) => {
  const { onDismiss, onPresent } = useContext(Context)

  const handlePresent = useCallback(() => {
    onPresent(modal, key)
  }, [modal, key, onPresent])

  return [handlePresent, onDismiss]
}

export default useModal
