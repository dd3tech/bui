import React from 'react'
import {
  NavbarContentActiveColor,
  NavbarContentVariants
} from './NavbarContent'

interface IContext {
  activeColor: NavbarContentActiveColor
  variant: NavbarContentVariants
}

const NavbarContentContext = React.createContext<IContext>({} as IContext)

export const NavbarContentProvider = NavbarContentContext.Provider
export const useNavbarContentContext = () =>
  React.useContext(NavbarContentContext)
