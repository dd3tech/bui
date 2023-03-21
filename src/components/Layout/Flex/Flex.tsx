import React, { forwardRef } from 'react'

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, children, ...props }: FlexProps, ref) => {
    return (
      <div
        ref={ref}
        role="flex"
        className={`flex ${className ?? ''}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export default Flex
