/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ReactNode } from 'react'
import { composeClasses } from 'lib/classes'
import { fontSize } from 'lib/font'
import Button from './Button'

export interface ActiveButtonProps {
  children: ReactNode
  active: boolean
  to?: () => void
}

const ActiveButton = ({
  children,
  active,
  to,
  ...props
}: ActiveButtonProps) => {
  return (
    <Button
      variant={active ? 'outlineBlue' : 'outline'}
      className={composeClasses(
        !active &&
          'bg-transparent border border-gray-300 text-gray-300 hover:border-primary hover:text-primary',
        fontSize.sm
      )}
      paddingX="5"
      paddingY="2"
      onClick={() => {
        if (to) {
          to()
        }
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default ActiveButton
