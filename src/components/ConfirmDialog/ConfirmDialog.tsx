/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ReactNode, useEffect, useRef } from 'react'
import { composeClasses } from 'lib/classes'
import Card from '../Card/Card'
import Text from '../Typography/Text'
import Button from '../Buttons/Button'
import Flex from 'components/Layout/Flex/Flex'

export interface IConfirmDialog {
  title?: string
  children: ReactNode
  textConfirmBtn?: string
  textCancelBtn?: string
  onConfirm: () => void
  onCancel?: () => void
  className?: string
  width?: number | string
}

const ConfirmDialog = ({
  title,
  children,
  textConfirmBtn = 'Apply',
  textCancelBtn = 'Reset',
  className,
  width,
  onConfirm,
  onCancel
}: IConfirmDialog) => {
  let activeDialog: HTMLDivElement | null = null
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const currentDialog = dialogRef?.current

    if (activeDialog && activeDialog !== currentDialog) {
      activeDialog.dispatchEvent(new CustomEvent('closeDialog'))
    }
    activeDialog = currentDialog

    return () => {
      if (activeDialog === currentDialog) {
        activeDialog = null
      }
    }
  }, [])

  useEffect(() => {
    const handleClose = () => {
      if (onCancel) onCancel()
    }

    const currentDialog = dialogRef.current
    currentDialog?.addEventListener('closeDialog', handleClose)

    return () => {
      currentDialog?.removeEventListener('closeDialog', handleClose)
    }
  }, [onCancel])

  return (
    <Card
      refCard={dialogRef}
      onClick={(e) => e.stopPropagation()}
      rounded="lg"
      className={composeClasses('w-full absolute bg-white', className)}
      width={width}
    >
      {title && (
        <Text variant="p" className="text-info mb-4 text-xxs font-semibold">
          {title}
        </Text>
      )}
      {children}
      <Flex gap="3" justifyContent="center" className="mt-1.5">
        {onCancel && (
          <Button
            role="cancel-btn"
            variant="link"
            className="underline text-xs disabled:opacity-75 text-black"
            style={{ padding: 0, fontWeight: 600 }}
            onClick={() => {
              onCancel?.()
              activeDialog = null
            }}
          >
            {textCancelBtn}
          </Button>
        )}
        <Button
          role="confirm-btn"
          variant="link"
          className="underline text-xs disabled:opacity-75 text-blue-500"
          style={{ padding: 0, fontWeight: 600 }}
          onClick={onConfirm}
        >
          {textConfirmBtn}
        </Button>
      </Flex>
    </Card>
  )
}
export default ConfirmDialog
