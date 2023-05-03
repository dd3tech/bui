import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { AlignItems, JustifyContent, Gap } from '../../../interfaces/types'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap
  justifyContent?: JustifyContent
  alignItems?: AlignItems
  className?: string
  children?: React.ReactNode
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      alignItems,
      justifyContent,
      gap,
      children,
      ...props
    }: FlexProps,
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="flex"
        className={composeClasses(
          'flex',
          gap && `gap-${gap}`,
          alignItems && `items-${alignItems}`,
          justifyContent && `justify-${justifyContent}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default Flex
