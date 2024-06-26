/*
 * Copyright (c) DD360 and its affiliates.
 */

import React, { forwardRef } from 'react'
import { composeClasses } from 'lib/classes'

type Cols = 1 | 2 | 3 | 4

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  className?: string
  cols: Cols
  sm?: Cols
  md?: Cols
  gap?: 1 | 2 | 3 | 4 | 5
}

const Row = forwardRef<HTMLDivElement, RowProps>((rowProps: RowProps, ref) => {
  const { children, className, cols, md, gap, sm, ...props } = rowProps

  return (
    <div
      className={composeClasses(
        `grid grid-cols-${cols}`,
        sm && `sm:grid-cols-${sm}`,
        md && `md:grid-cols-${md}`,
        gap && `gap-${gap}`,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Row.displayName = 'Row'
Row.defaultProps = {
  cols: 4,
  md: 2,
  sm: 1,
  gap: 4,
  className: undefined
}

export default Row
