/*
 * Copyright (c) DD360 and its affiliates.
 */

import { useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import { Rounded } from '../../interfaces/types'

export interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  rounded?: Rounded
  padding?: number
  paddingY?: number
  paddingX?: number
  className?: string
  height?: 'fit-content' | 'auto' | number
  width?: number | string
}

const Card = ({
  children,
  rounded = 'none',
  height = 'fit-content',
  width,
  padding = 4,
  paddingX,
  paddingY,
  className = '',
  style,
  ...otherProps
}: ICardProps) => {
  const getPadding = useCallback(() => {
    if (paddingX && paddingY) {
      return `px-${paddingX} py-${paddingY}`
    }

    if (paddingX) {
      return `px-${paddingX}`
    }

    if (paddingY) {
      return `py-${paddingY}`
    }

    return `p-${padding}`
  }, [padding, paddingY, paddingX])

  return (
    <div
      data-testid="card-contain"
      style={{ ...style, height, width }}
      className={composeClasses(
        'shadow-sm border',
        rounded && `rounded-${rounded}`,
        getPadding(),
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}

Card.displayName = 'Card'

export default Card
