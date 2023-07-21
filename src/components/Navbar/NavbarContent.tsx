/*
 * Copyright (c) DD360 and its affiliates.
 */

import { composeClasses } from 'lib/classes'
import { NavbarContentProvider } from './NavbarContentContext'

export type NavbarContentVariants = 'default' | 'underline' | 'highlight'
export type NavbarContentActiveColor =
  | 'primary'
  | 'success'
  | 'error'
  | 'warning'

export interface NavbarContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hiddenIn?: string
  children?: React.ReactNode
  activeColor?: NavbarContentActiveColor
  variant?: NavbarContentVariants
}

const NavbarContent = ({
  hiddenIn,
  children,
  variant = 'default',
  activeColor = 'primary',
  ...props
}: NavbarContentProps) => {
  return (
    <NavbarContentProvider value={{ activeColor, variant }}>
      <div
        {...props}
        className={composeClasses(
          'h-full flex-nowrap items-center gap-9',
          hiddenIn ? `hidden ${hiddenIn}:flex` : 'flex',
          props.className
        )}
      >
        {children}
      </div>
    </NavbarContentProvider>
  )
}

export default NavbarContent
