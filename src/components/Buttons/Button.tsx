import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { fontSize } from 'lib/font'
import { ButtonVariant, Padding, Weight, Rounded } from '../../interfaces/types'

import Spinner from '../Spinner'

export type LoaderContentProps = {
  component?: React.ReactElement
  textLoading?: string
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'small' | 'medium' | 'large' | 'extraLarge'
  disabled?: boolean
  isLoading?: boolean
  className?: string
  padding?: Padding
  paddingX?: Padding
  paddingY?: Padding
  fontWeight?: Weight
  rounded?: Rounded
  role?: string
  renderLoading?: LoaderContentProps
}

const LoaderContent: React.FC<LoaderContentProps> = ({
  textLoading = 'Cargando...',
  component
}) => {
  if (component) return component

  return (
    <div className="flex items-center justify-center gap-4">
      <Spinner color="#FFF" width="1rem" height="1rem" border={3} />
      <span>{textLoading}</span>
    </div>
  )
}

const buttonsVariants: { [key: string]: string } = {
  primary: 'bg-primary text-white hover:bg-blue-800 disabled:bg-gray-300',
  secondary:
    'bg-secondary border border-black hover:bg-white disabled:opacity-20',
  cancel:
    'bg-white text-black hover:text-white hover:bg-error disabled:opacity-75',
  error: 'text-white bg-error hover:bg-error disabled:opacity-75',
  outlineBlue: 'bg-secondary border border-primary text-primary',
  success: 'bg-success hover:bg-green-600 text-white',
  outlineWhite:
    'bg-secondary border border-white text-white hover:bg-gray-50 hover:text-black',
  danger: 'bg-error hover:bg-error text-white disabled:bg-red-300',
  outlineWhiteRed:
    'bg-white border border-error text-error hover:bg-error hover:text-white'
}

const sizeVariants: { [key: string]: string } = {
  small: fontSize.xs,
  medium: fontSize.sm,
  large: fontSize.md,
  extraLarge: fontSize.lg
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      onClick,
      children = 'Click Me!',
      isLoading,
      className,
      padding = '2',
      paddingX,
      paddingY,
      renderLoading,
      fontWeight = 'bold',
      rounded = 'md',
      ...props
    }: IButtonProps,
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={composeClasses(
          'transition duration-500 ease-out',
          'hover:ease-in',
          padding && `p-${padding}`,
          paddingX && `px-${paddingX}`,
          paddingY && `py-${paddingY}`,
          buttonsVariants[variant],
          (isLoading || props.disabled) && 'cursor-not-allowed',
          sizeVariants[size],
          `font-${fontWeight}`,
          `rounded-${rounded}`,
          className
        )}
        onClick={(e) => {
          if (!props.disabled && onClick !== undefined && !isLoading) {
            onClick(e)
          }
        }}
        {...props}
      >
        {isLoading ? <LoaderContent {...renderLoading} /> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
