/*
 * Copyright (c) DD360 and its affiliates.
*/

import React from 'react'
import { composeClasses } from 'lib/classes'
import Text from '../Typography/Text'
import { IRadio } from './Radio'

export interface IRadioGroup {
  title?: string
  row?: boolean
  children: React.ReactNode
  name?: string
  value: string
  className?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function RadioGroup({
  title,
  row,
  children,
  name,
  value,
  className,
  onChange
}: IRadioGroup) {
  return (
    <div className={composeClasses('flex flex-col', className)}>
      {title && (
        <Text role="title" size="base" className="mb-5" textMuted500>
          {title}
        </Text>
      )}
      <div
        role="radio-group"
        className={composeClasses('flex', row ? 'flex-row' : 'flex-col')}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement<IRadio>(child)) {
            return child
          }

          return React.cloneElement<IRadio>(child, {
            name: name ? name : 'default-radio-buttons-group',
            checked: child.props.value === value,
            className: child.props.className?.length
              ? child.props.className
              : 'mr-8',
            onChange
          })
        })}
      </div>
    </div>
  )
}

export default RadioGroup
