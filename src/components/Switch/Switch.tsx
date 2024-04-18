/*
 * Copyright (c) DD360 and its affiliates.
 */

import { FC, forwardRef, ReactNode } from 'react'
import { composeClasses } from 'lib/classes'

export interface ISwitchProps {
  toggle: boolean
  setToggle: any
  className?: string
  customIcon?: ReactNode
  text?: string
  size?: 'sm' | 'lg'
}

const Switch: FC<ISwitchProps> = forwardRef<HTMLDivElement, ISwitchProps>(
  ({ toggle, setToggle, customIcon, text, size = 'lg', ...props }, ref) => {
    const containerClasses = composeClasses(
      size === 'lg' ? 'w-12 h-6 md:w-16 md:h-8' : 'w-8 h-4 md:w-12 md:h-6',
      'flex items-center rounded-full p-1 cursor-pointer transition duration-500',
      toggle ? 'bg-blue-100' : 'bg-gray-300'
    )

    const switchClasses = composeClasses(
      size === 'lg' ? 'w-5 h-5 md:w-6 md:h-6' : 'w-4 h-4 md:w-5 md:h-5',
      'rounded-full shadow-md transform transition-transform duration-500',
      toggle && (size === 'lg' ? 'translate-x-8' : 'translate-x-5'),
      toggle ? 'bg-primary' : 'bg-white'
    )

    return (
      <>
        <div className="flex gap-3" {...props} ref={ref}>
          <div
            data-testid="switch-toggle"
            className={containerClasses}
            onClick={() => {
              setToggle((prev: boolean) => !prev)
            }}
          >
            <div className={switchClasses}>
              {customIcon && <div>{customIcon}</div>}
            </div>
          </div>
          <div>
            <label className="bold">{text}</label>
          </div>
        </div>
      </>
    )
  }
)

export default Switch
