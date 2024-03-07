/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  useEffect,
  useRef,
  useState
} from 'react'
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
  const ref = useRef<HTMLDivElement>(null)
  const [toggle, setToggle] = useState(false)
  const [trigger, menu] = children

  useEffect(() => {
    const handleClickOutside = (ev: any) => {
      if (ref.current && !ref.current.contains(ev.target)) {
        setToggle(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DropdownProvider value={{ disableAnimation, toggle, setToggle }}>
      <div
        ref={ref}
        {...props}
        className={composeClasses('relative', props.className)}
      >
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
