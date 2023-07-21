/*
 * Copyright (c) DD360 and its affiliates.
 */

import { PropsWithoutRef, ReactElement, RefAttributes, useState } from 'react'
import { composeClasses } from 'lib/classes'
import DropdownMenu from './DropdownMenu'
import DropdownTrigger from './DropdownTrigger'
import { DropdownProvider } from './DropdownContext'

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: [
    ReactElement<typeof DropdownTrigger>,
    ReactElement<typeof DropdownMenu>
  ]
  disableAnimation?: boolean
}

const Dropdown = ({ children, disableAnimation, ...props }: DropdownProps) => {
  const [toggle, setToggle] = useState(false)
  const [trigger, menu] = children

  return (
    <DropdownProvider value={{ disableAnimation, toggle, setToggle }}>
      <div {...props} className={composeClasses('relative', props.className)}>
        {trigger}
        {menu}
      </div>
    </DropdownProvider>
  )
}

type DropdownComponent<T, P = object> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Menu: typeof DropdownMenu
  Trigger: typeof DropdownTrigger
}

export default Dropdown as DropdownComponent<HTMLDivElement, DropdownProps>
