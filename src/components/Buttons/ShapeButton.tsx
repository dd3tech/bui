/*
 * Copyright (c) DD360 and its affiliates.
*/

import React from 'react'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import { borderRadius } from 'lib/shape'
import { composeClasses } from 'lib/classes'
import { ShadowVariants } from '../../interfaces/types'

interface BaseCircleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  disabled?: boolean
  selected?: boolean
  width?: string
  height?: string
  shadow?: ShadowVariants
  variant?: 'square' | 'circle'
}

export type WithouVariantButtonProps = Omit<BaseCircleButtonProps, 'variant'>

const globalStyles = {
  default: 'text-primary hover:bg-gray-50',
  selected: 'bg-primary text-white',
  disabled: 'text-gray-300'
}

const buildClassName = (disabled?: boolean, selected?: boolean) => {
  if (disabled) {
    return globalStyles.disabled
  }

  return selected ? globalStyles.selected : globalStyles.default
}

function BaseCircleButton({
  icon,
  width = '3rem',
  height = '3rem',
  disabled,
  selected,
  shadow = 'sm',
  variant = 'circle',
  ...props
}: BaseCircleButtonProps) {
  return (
    <button
      style={{ ...props.style, width, height }}
      className={composeClasses(
        'border border-gray-300 flex items-center justify-center',
        variant === 'circle' ? borderRadius.full.all : borderRadius.lg.all,
        `shadow-${shadow}`,
        buildClassName(disabled, selected)
      )}
    >
      {icon ? (
        icon
      ) : (
        <HomeIcon
          style={{
            width: '2.5rem',
            height: '2.5rem',
            padding: '0.5rem'
          }}
        />
      )}
    </button>
  )
}

function SquareButton({ ...props }: WithouVariantButtonProps) {
  return <BaseCircleButton variant="square" {...props} />
}

function CircleButton({ ...props }: WithouVariantButtonProps) {
  return <BaseCircleButton variant="circle" {...props} />
}

export default {
  BaseCircleButton,
  SquareButton,
  CircleButton
}
