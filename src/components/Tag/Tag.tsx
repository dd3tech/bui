/*
 * Copyright (c) DD360 and its affiliates.
 */

import { ElementType } from 'react'
import { composeClasses } from 'lib/classes'
import { fontSize } from 'lib/font'
import { Rounded } from 'interfaces/types'

type Size = 'small' | 'medium' | 'large' | 'extraLarge'
type Variants = 'primary' | 'secondary' | 'success' | 'warning'

export interface ITagProps extends React.HTMLProps<HTMLDivElement> {
  text?: string
  className?: string
  fontSize?: Size
  variant: Variants
  classNameIcon?: string
  icon?: ElementType
  rounded?: Rounded
  fill?: boolean
}

const tagVariants: { [Variants: string]: string } = {
  primary: 'bg-blue-100 text-blue-700 font-medium',
  warning: 'bg-yellow-50 text-warning font-medium',
  secondary: 'bg-gray-50 text-gray-700 font-medium',
  success: 'bg-green-50 text-green-700 font-medium'
}

const tagVariantsWithFill: { [Variants: string]: string } = {
  primary: 'bg-blue-600 text-blue-50 font-semibold',
  warning: 'bg-yellow-600 text-yellow-50 font-semibold',
  secondary: 'bg-gray-200 text-gray-600 font-semibold',
  success: 'bg-green-500 text-green-50 font-semibold'
}

const sizeVariants: { [Size: string]: string } = {
  small: fontSize.xs,
  medium: fontSize.sm,
  large: fontSize.md,
  extraLarge: fontSize.lg
}

const sizeIcon: { [Size: string]: string } = {
  small: 'w-3 h-3',
  medium: 'w-4 h-4',
  large: 'w-5 h-5',
  extraLarge: 'w-6 h-6'
}

const getClassNames = (
  className: string | undefined,
  variant: Variants,
  fontSizeVariant: Size,
  rounded: string,
  fill: boolean
): string => {
  const baseClasses = `inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-${rounded}`
  const variantClasses = fill
    ? tagVariantsWithFill[variant]
    : tagVariants[variant]
  const fontSizeClass = sizeVariants[fontSizeVariant]

  return composeClasses(baseClasses, variantClasses, fontSizeClass, className)
}

const Tag = ({
  text,
  className,
  variant,
  classNameIcon,
  icon: Icon,
  rounded = 'md',
  fontSize = 'medium',
  fill = false,
  ...props
}: ITagProps) => {
  const classNames = getClassNames(className, variant, fontSize, rounded, fill)
  const classSizeIcon = sizeIcon[fontSize]

  return (
    <div role="container-tag" className={classNames} {...props}>
      {Icon && (
        <Icon
          className={composeClasses(classSizeIcon, classNameIcon)}
          aria-hidden="true"
          data-testid="tag-icon"
        />
      )}
      {text}
    </div>
  )
}

Tag.displayName = 'Tag'
Tag.defaultProps = {
  text: 'Label tag',
  variant: 'primary'
}

export default Tag
