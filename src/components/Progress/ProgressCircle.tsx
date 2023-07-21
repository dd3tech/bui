/*
 * Copyright (c) DD360 and its affiliates.
 */

import { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'
import Transition from 'components/Transition'
import { ProgressProps } from './Progress'

interface ProgressCircleProps
  extends ProgressProps,
    React.HTMLAttributes<HTMLDivElement> {
  /**
   * The `stroke-dasharray` property of the progress circle component.
   */
  strokeDasharray?: string
}

const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
  (
    {
      circleSize,
      lineWidth,
      indeterminate,
      progressLineColor,
      backgroundLineColor,
      lineCap = 'butt',
      strokeDasharray,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        role="progress-circle"
        className={composeClasses('relative', props.className)}
        style={{ ...props.style }}
      >
        <Transition animationStart="spin" duration={indeterminate ? 800 : 0}>
          <svg
            role="progress-circle-svg"
            className="progress-circle"
            viewBox="0 0 100 100"
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
              transform: 'rotate(-90deg)'
            }}
          >
            <circle
              role="progress-circle-background"
              style={{ strokeWidth: lineWidth, stroke: backgroundLineColor }}
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              role="progress-circle-line"
              className={composeClasses(
                indeterminate && 'progress-circle-indeterminate',
                'progress-circle-animation'
              )}
              style={{
                strokeWidth: lineWidth,
                stroke: progressLineColor,
                strokeDasharray: strokeDasharray,
                strokeLinecap: lineCap,
                strokeDashoffset: '0'
              }}
              cx="50"
              cy="50"
              r="45"
            />
          </svg>
        </Transition>
        {children}
      </div>
    )
  }
)

export default ProgressCircle
