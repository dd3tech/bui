/*
 * Copyright (c) DD360 and its affiliates.
 */

import * as HIcons from '@heroicons/react/outline'
import React, { forwardRef } from 'react'

export type IconName = keyof typeof HIcons

export interface DynamicHeroIconProps extends React.ComponentProps<'svg'> {
  icon: IconName
}

const DynamicHeroIcon = forwardRef<SVGSVGElement, DynamicHeroIconProps>(
  ({ icon, className, ...props }, ref) => {
    const SingleIcon = HIcons[icon]

    return (
      <SingleIcon
        id={icon}
        className={className}
        aria-hidden="true"
        ref={ref}
        {...props}
      />
    )
  }
)

export default DynamicHeroIcon
