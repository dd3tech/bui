/*
 * Copyright (c) DD360 and its affiliates.
*/

import {
  ExclamationCircleIcon,
  TagIcon,
  CheckCircleIcon,
  ExclamationIcon,
  ClipboardCopyIcon,
  HomeIcon,
  ClockIcon,
  RefreshIcon
} from '@heroicons/react/outline'
import { borderRadius } from 'lib/shape'
import { composeClasses } from 'lib/classes'
import { fontSize } from 'lib/font'

export interface IBadgeProps extends React.HTMLProps<HTMLDivElement> {
  text?: string
  className?: string
  variant:
    | 'warning'
    | 'infoPrimary'
    | 'infoSecondary'
    | 'success'
    | 'primary'
    | 'secondary'
    | 'error'
  classNameIcon?: string
  icon?:
    | 'tag'
    | 'clock'
    | 'warning'
    | 'check'
    | 'success'
    | 'exclamation'
    | 'clipboard-copy'
    | 'HomeIcon'
    | 'RefreshIcon'
    | 'none'
}

const badgeVariants: { [key: string]: string } = {
  warning: 'bg-yellow-100 border border-warning text-info',
  infoPrimary: 'bg-blue-50 border border-blue-300 text-info',
  infoSecondary: 'bg-transparent border border-blue-300 text-info',
  success: 'bg-green-50 border border-green-300 text-info font-medium',
  primary: 'bg-transparent border border-primary text-primary',
  secondary:
    'bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black',
  error: 'bg-error border border-red-300 text-info font-medium'
}

const iconsSwitch = (iconType: IBadgeProps['icon'], classNameIcon = '') => {
  switch (iconType) {
    case 'tag':
      return <TagIcon className={classNameIcon} />
    case 'clock':
      return <ClockIcon className={classNameIcon} />
    case 'warning':
      return <ExclamationIcon className={classNameIcon} />
    case 'check':
      return <CheckCircleIcon className={classNameIcon} />
    case 'success':
      return <CheckCircleIcon className={classNameIcon} />
    case 'exclamation':
      return <ExclamationCircleIcon className={classNameIcon} />
    case 'clipboard-copy':
      return <ClipboardCopyIcon className={classNameIcon} />
    case 'HomeIcon':
      return <HomeIcon className={classNameIcon} />
    case 'RefreshIcon':
      return <RefreshIcon className={classNameIcon} />
    case 'none':
    default:
      return <></>
  }
}

const Badge = ({
  text,
  className,
  variant,
  classNameIcon,
  icon,
  ...props
}: IBadgeProps) => {
  const classNameByVariant = badgeVariants[variant]
  return (
    <div
      id={icon}
      role="container-badge"
      className={composeClasses(
        className,
        classNameByVariant,
        borderRadius.full.all,
        fontSize.xs,
        'flex items-center gap-1',
        (!icon || icon === 'none') && 'justify-center'
      )}
      {...props}
    >
      {iconsSwitch(icon, classNameIcon)} <small role="text-badge">{text}</small>
    </div>
  )
}

Badge.displayName = 'Badge'
Badge.defaultProps = {
  icon: 'HomeIcon',
  text: 'Home Badge',
  variant: 'primary'
}

export default Badge
