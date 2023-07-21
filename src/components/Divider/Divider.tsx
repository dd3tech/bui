/*
 * Copyright (c) DD360 and its affiliates.
 */

import { composeClasses } from 'lib/classes'

export interface IDivider {
  vertical?: boolean
  light?: boolean
  variant?: 'middle' | 'full'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const getClassesDivider = ({
  vertical,
  light,
  variant,
  size = 'small'
}: Omit<IDivider, 'className'>) => {
  const position = vertical ? 'r' : 't'
  const sizeVariants: { [key: string]: string } = {
    small: `border-${position}`,
    medium: `border-${position}-2`,
    large: `border-${position}-3`
  }

  return {
    orientation: vertical ? 'h-auto mr-1 ml-1' : '',
    variant: variant === 'full' ? '' : vertical ? 'mt-1 mb-1' : 'ml-1 mr-1',
    size: sizeVariants[size],
    color: light
      ? 'border-gray-300 dark:border-primary'
      : 'border-gray-400 dark:border-blue-50'
  }
}

const Divider = (props: IDivider) => {
  const classes = getClassesDivider(props)
  return (
    <hr
      className={composeClasses(
        'flex self-stretch',
        classes.orientation,
        classes.variant,
        classes.size,
        classes.color,
        props.className
      )}
    />
  )
}

export default Divider
