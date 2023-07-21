/*
 * Copyright (c) DD360 and its affiliates.
*/

import { ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { Portal } from '../../common/Portal/Portal'
import Card from '../Card/Card'
import Text from '../Typography/Text'
import Button from '../Buttons/Button'

export interface IConfirmDialog {
  title?: string
  children: ReactNode
  textConfirmBtn?: string
  textCancelBtn?: string
  onConfirm: () => void
  onCancel?: () => void
  position?: { show: boolean; left: number; top: number }
  className?: string
  width?: number | string
  idRoot?: string
}

const ConfirmDialog = ({
  title,
  children,
  textConfirmBtn = 'Apply',
  textCancelBtn = 'Reset',
  position,
  className,
  width,
  onConfirm,
  onCancel,
  idRoot
}: IConfirmDialog) => {
  return (
    <Portal idRoot={idRoot}>
      {position?.show && (
        <Card
          rounded="lg"
          className={composeClasses('w-max absolute bg-white', className)}
          width={width}
          style={{ left: position?.left, top: position?.top }}
        >
          {title && (
            <Text variant="p" className="text-info mb-4 text-xxs font-semibold">
              {title}
            </Text>
          )}

          {children}

          <div className="flex gap-4 justify-end mt-1.5">
            {onCancel && (
              <Button
                role="cancel-btn"
                variant="link"
                className="underline text-xs disabled:opacity-75 text-black"
                style={{ padding: 0, fontWeight: 600 }}
                onClick={onCancel}
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
          </div>
        </Card>
      )}
    </Portal>
  )
}

export default ConfirmDialog
