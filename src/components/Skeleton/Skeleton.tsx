import { Rounded } from '../../interfaces/types'
import React from 'react'

export interface SkeletonProps {
  /**
   * Optional class name for the Skeleton
   */
  className?: string
  style?: React.CSSProperties
  /**
   * Optional value for the rounded of the Skeleton
   */
  rounded?: Rounded
  /**
   * Optional value to indicate when the element is inside a container with the flex property
   */
  inFlex?: boolean
}

const Skeleton = ({
  className,
  style,
  inFlex,
  rounded = 'none'
}: SkeletonProps) => {
  return (
    <div
      data-testid="skeleton-content"
      className="animate-pulse"
      style={{ width: inFlex ? '100%' : 'initial' }}
    >
      <div
        data-testid="skeleton"
        className={`rounded-${rounded} ${
          className ?? 'h-2.5 w-48 bg-gray-200'
        }`}
        style={style}
      ></div>
    </div>
  )
}

export default Skeleton
