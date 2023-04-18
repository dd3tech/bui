import { useState, useEffect, useCallback } from 'react'

export interface IParamsConfigModal {
  open: boolean
  onClose: () => void
  disableEscapeKeyDown?: boolean
  preventClose?: boolean
}

export default function useModalManager(params: IParamsConfigModal) {
  const {
    open,
    onClose,
    disableEscapeKeyDown = false,
    preventClose = false
  } = params
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function handleModalClose() {
    if (preventClose) return
    setIsOpen(false)
    onClose()
  }

  const escDown = useCallback(
    (event: KeyboardEvent) => {
      if (!disableEscapeKeyDown && event.key === 'Escape') {
        handleModalClose()
      }
    },
    [disableEscapeKeyDown, handleModalClose]
  )

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', escDown)
    return () => {
      document.removeEventListener('keydown', escDown)
    }
  }, [disableEscapeKeyDown, handleModalClose])

  return { isOpen, handleModalClose }
}
