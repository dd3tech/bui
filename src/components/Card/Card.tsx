import { forwardRef, useCallback } from 'react'
import { composeClasses } from 'lib/classes'
import { Rounded } from '../../interfaces/types'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  rounded?: Rounded
  padding?: number
  paddingY?: number
  paddingX?: number
  className?: string
  height?: 'fit-content' | 'auto' | number
  width?: number | string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      rounded,
      height,
      width,
      padding,
      paddingX,
      paddingY,
      className,
      style,
      ...otherProps
    },
    ref
  ) => {
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
        ref={ref}
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
)

Card.displayName = 'Card'
Card.defaultProps = {
  rounded: 'none',
  padding: 4,
  height: 'fit-content',
  className: ''
}

export default Card
