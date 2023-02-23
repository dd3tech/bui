import React from 'react'

interface IContext {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarCollapseContext = React.createContext<IContext>({} as IContext)

export const NavbarCollapseProvider = NavbarCollapseContext.Provider
export const useNavbarCollapseContext = () => React.useContext(NavbarCollapseContext)
