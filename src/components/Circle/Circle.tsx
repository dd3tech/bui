/*
 * Copyright (c) DD360 and its affiliates.
*/

import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { composeStyles } from 'lib/styles'

interface CircleProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode
  backgroundColor?: string
  className?: string
  width?: string
  height?: string
  border?: string
  useBackground?: boolean
  disabled?: boolean
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(
  (circleProps: CircleProps, ref) => {
    const {
      children,
      backgroundColor = '#EFF6FF',
      className = '',
      width = '3rem',
      height = '3rem',
      border,
      useBackground = true,
      disabled,
      ...props
    } = circleProps

    return (
      <div
        ref={ref}
        className={composeClasses(
          'items-center flex justify-center rounded-full',
          disabled &&
            'disabled:text-gray-300 disabled:border disabled:border-gray-300 disabled:bg-white',
          className
        )}
        style={composeStyles([
          {
            backgroundColor: useBackground && backgroundColor,
            width,
            height,
            border
          }
        ])}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Circle.displayName = 'Circle'
export default Circle
