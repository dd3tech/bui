/*
 * Copyright (c) DD360 and its affiliates.
 */

import * as HIcons from '@heroicons/react/outline'

export type IconName = keyof typeof HIcons

export interface DynamicHeroIconProps extends React.ComponentProps<'svg'> {
  icon: IconName
}

const DynamicHeroIcon = ({
  icon,
  className,
  ...props
}: DynamicHeroIconProps) => {
  const SingleIcon = HIcons[icon]

  return (
    <SingleIcon id={icon} className={className} aria-hidden="true" {...props} />
  )
}

export default DynamicHeroIcon
