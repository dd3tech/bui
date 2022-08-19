import React from 'react'
import * as HIcons from '@heroicons/react/outline'

export type IconName = keyof typeof HIcons

export interface DynamicHeroIconProps extends React.ComponentProps<'svg'> {
    icon: IconName
}

export const DynamicHeroIcon = ({ icon, className, ...props }: DynamicHeroIconProps) => {
    const SingleIcon = HIcons[icon]

    return <SingleIcon className={className} aria-hidden="true" {...props} />
}
