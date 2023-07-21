/*
 * Copyright (c) DD360 and its affiliates.
*/

import { Rounded, UnitCSS } from '../../interfaces/types'
import React from 'react'
import './skeleton.css'
import { composeClasses } from 'lib/classes'

export interface SkeletonProps extends React.HTMLProps<HTMLSpanElement> {
  /**
   * Optional class name for the Skeleton
   */
  className?: string
  /**
   * Optional object for the styles of the Skeleton
   */
  style?: React.CSSProperties
  /**
   * Optional value for the rounded of the Skeleton
   */
  rounded?: Rounded
  /**
   * Optional value for the height of the Skeleton
   */
  height?: UnitCSS
  /**
   * Optional value for the width of the Skeleton
   */
  width?: UnitCSS
  /**
   * Optional children to infer width and height from
   */
  children?: React.ReactNode
  /**
   * Animation type. If false the animation effect is disabled.
   */
  animation?: 'pulse' | 'wave' | false
  /**
   * Optional value for the color of the Skeleton
   */
  color?: string
}

const Skeleton = ({
  className,
  style,
  children,
  height,
  width,
  color,
  animation = 'pulse',
  rounded = 'none',
  ...props
}: SkeletonProps) => {
  const styleObj = children
    ? { height: 'fit-content', width: 'fit-content' }
    : { height, width }

  return (
    <span
      data-testid="skeleton"
      className={composeClasses(
        'skeleton-cmpt bg-gray-200 block',
        animation && `animate-${animation}`,
        `rounded-${rounded}`,
        className
      )}
      style={{ ...styleObj, backgroundColor: color, ...style }}
      {...props}
    >
      {children}
    </span>
  )
}

export default Skeleton
