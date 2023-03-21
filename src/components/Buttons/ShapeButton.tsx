import React from 'react'
import HomeIcon from '@heroicons/react/outline/HomeIcon'
import { ShadowVariants } from '../../interfaces/types'
import { borderRadius } from 'lib/shape'
import { composeClasses } from 'lib/classes'

interface BaseCircleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: () => React.ReactNode
  disabled?: boolean
  selected?: boolean
  width?: string
  height: string
  shadow?: ShadowVariants
  variant?: 'square' | 'circle'
  iconProperties?: { width?: string; height?: string; padding?: string }
}

export type WithoutTypeButtonProps = Omit<BaseCircleButtonProps, 'variant'>

const globalStyles = {
  default: 'text-blue-700 hover:bg-gray-50',
  selected: 'bg-blue-700 text-white',
  disabled: 'text-gray-300'
}

const defaultIconProperties = {
  width: '2.5rem',
  height: '2.5rem',
  padding: '0.5rem'
}

const buildClassName = (disabled?: boolean, selected?: boolean) => {
  if (disabled) {
    return globalStyles.disabled
  }

  return selected ? globalStyles.selected : globalStyles.default
}

function BaseCircleButton({
  Icon,
  width = '3rem',
  height = '3rem',
  disabled,
  selected,
  shadow = 'sm',
  iconProperties = defaultIconProperties,
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
      {!Icon && <HomeIcon style={iconProperties} />}
      {Icon && Icon()}
    </button>
  )
}

function SquareButton({ ...props }: WithoutTypeButtonProps) {
  return <BaseCircleButton variant="square" {...props} />
}

function CircleButton({ ...props }: WithoutTypeButtonProps) {
  return <BaseCircleButton variant="circle" {...props} />
}

export default {
  BaseCircleButton,
  SquareButton,
  CircleButton
}
