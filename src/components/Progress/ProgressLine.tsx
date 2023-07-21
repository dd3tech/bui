/*
 * Copyright (c) DD360 and its affiliates.
*/

import { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import { ProgressProps } from './Progress'

interface ProgressLineProps
  extends ProgressProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The value of the progress component. It must be between 0 and 100.
   */
  progress?: number
}

const ProgressLine = forwardRef<HTMLDivElement, ProgressLineProps>(
  (
    {
      width,
      height,
      indeterminate,
      progressLineColor,
      backgroundLineColor,
      progress,
      lineCap = 'round',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        role="progress-line-background"
        className={composeClasses(
          lineCap === 'round' ? 'rounded-full' : 'rounded-none',
          'relative overflow-hidden',
          props.className
        )}
        style={{
          width: width,
          height: height,
          backgroundColor: backgroundLineColor,
          ...props.style
        }}
      >
        <div
          role="progress-line"
          className={composeClasses(
            indeterminate && 'progress-linear-indeterminate',
            lineCap === 'round' ? 'rounded-full' : 'rounded-none',
            'progress-linear-animation absolute inset-0 h-full'
          )}
          style={{ width: `${progress}%`, backgroundColor: progressLineColor }}
        />
        {children}
      </div>
    )
  }
)

export default ProgressLine
