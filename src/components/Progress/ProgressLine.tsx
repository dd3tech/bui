import { composeClasses } from 'lib/classes'
import React, { ReactNode, forwardRef } from 'react'

interface ProgressLineProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The width of the progress line component.
   */
  width?: number | string
  /**
   * The height of the progress line component.
   */
  height?: number | string
  /**
   * A boolean indicating whether the progress component is in an indeterminate
   * state. If it is true, it will start an infinite animation.
   */
  indeterminate?: boolean
  /**
   * The color of the progress line.
   */
  progressLineColor?: string
  /**
   * The color of the progress line background.
   */
  backgroundLineColor?: string
  /**
   * The value of the progress component. It must be between 0 and 100.
   */
  progress?: number
  /**
   * The line cap of the progress line. It is 'round' by default.
   */
  lineCap?: 'round' | 'square' | 'butt'
  /**
   * The children of the progress component.
   */
  children?: ReactNode
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
