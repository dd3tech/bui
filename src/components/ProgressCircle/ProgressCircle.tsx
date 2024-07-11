/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar'

export interface ProgressCircleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  colorComplete?: string
  colorProgress?: string
  colorBackground?: string
  strokeWidth?: number
  children?: React.ReactNode
  classNamePercentage?: string
  width?: number
}

const ProgressCircle = ({
  value = 100,
  colorComplete = '#34D399',
  colorProgress = 'var(--primary)',
  colorBackground = '#DBEAFE',
  strokeWidth = 11,
  children = <p>Completado</p>,
  classNamePercentage = 'w-full text-center text-3xl',
  width = 200
}: ProgressCircleProps) => {
  return (
    <>
      <div style={{ width }} role="container-circular-progress">
        <CircularProgressbarWithChildren
          styles={buildStyles({
            pathColor: value < 100 ? colorProgress : colorComplete,
            trailColor: colorBackground
          })}
          strokeWidth={strokeWidth}
          value={value}
        >
          <div className={classNamePercentage}>
            {Math.min(value, 100).toFixed(0)}%
          </div>
          <div role="children-progress-circle">{children}</div>
        </CircularProgressbarWithChildren>
      </div>
    </>
  )
}

ProgressCircle.displayName = 'ProgressCircle'

export default ProgressCircle
