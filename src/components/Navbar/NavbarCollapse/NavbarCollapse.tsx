import { useState, ReactElement } from 'react'
import NavbarCollapseContent from './NavbarCollapseContent'
import NavbarCollapseToggle from './NavbarCollapseToggle'
import { NavbarCollapseProvider } from './NavbarCollapseContext'

type NavbarCollapseToggleElement = ReactElement<typeof NavbarCollapseToggle>
type NavbarCollapseContentElement = ReactElement<typeof NavbarCollapseContent>

export interface NavbarCollapseProps {
    children: [NavbarCollapseToggleElement, NavbarCollapseContentElement]
}

const NavbarCollapse = ({ children }: NavbarCollapseProps): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [toggle, content] = children

    return (
        <NavbarCollapseProvider value={{ isCollapsed, setIsCollapsed }}>
            {toggle}
            {content}
        </NavbarCollapseProvider>
    )
}

export default NavbarCollapse
