/*
 * Copyright (c) DD360 and its affiliates.
*/

import { forwardRef, FC, ReactNode } from 'react'
import { AlignItems } from '../../interfaces/types'
import { composeClasses } from 'lib/classes'

export type BtnPosition = 'horizontal' | 'vertical'

export interface ButtonGroupProps {
  children: ReactNode
  orientation?: BtnPosition
  gap?: number
  align?: AlignItems
  className?: string
}

const getStyleBtnGroup = ({ orientation }: { orientation: BtnPosition }) => {
  if (orientation === 'vertical') {
    return 'flex flex-col'
  }
  return 'flex flex-row'
}

const ButtonGroup: FC<ButtonGroupProps> = forwardRef<
  HTMLDivElement,
  ButtonGroupProps
>((btnGroupProps: ButtonGroupProps, ref) => {
  const {
    children,
    orientation = 'vertical',
    gap = 6,
    align,
    className,
    ...otherProps
  } = btnGroupProps

  return (
    <div
      className={composeClasses(
        getStyleBtnGroup({ orientation }),
        `justify-${align}`,
        className
      )}
      style={{ gap: gap }}
      ref={ref}
      {...otherProps}
    >
      {children}
    </div>
  )
})

ButtonGroup.displayName = 'ButtonGroup'
ButtonGroup.defaultProps = {
  align: 'start',
  orientation: 'vertical',
  gap: 6,
  className: undefined
}

export default ButtonGroup
