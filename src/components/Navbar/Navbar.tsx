import { PropsWithoutRef, RefAttributes } from 'react'
import { Padding, Rounded, ShadowVariants } from 'interfaces/types'
import { composeClasses } from 'lib/classes'
import NavbarBrand from './NavbarBrand'
import NavbarCollapse from './NavbarCollapse/NavbarCollapse'
import NavbarCollapseContent from './NavbarCollapse/NavbarCollapseContent'
import NavbarCollapseToggle from './NavbarCollapse/NavbarCollapseToggle'
import NavbarContent from './NavbarContent'
import NavbarLink from './NavbarLink'
import NavbarItem from './NavbarItem'
import NavbarGroup from './NavbarGroup'

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode
    paddingY?: Padding
    paddingX?: Padding
    rounded?: Rounded
    variant?: 'floating' | 'sticky' | 'static'
    shadow?: ShadowVariants
}

const navbarVariants: { [key: string]: string } = {
    floating: 'mx-6 my-3',
    sticky: 'sticky top-0',
    static: 'static'
}

const Navbar = ({ children, paddingX = '10', paddingY = '0', variant = 'sticky', rounded = 'none', shadow = 'base', ...props }: NavbarProps) => {
    const classes = composeClasses(
        'h-16 flex items-center justify-between',
        `px-${paddingX}`,
        `py-${paddingY}`,
        `rounded-${rounded}`,
        `shadow-${shadow}`,
        navbarVariants[variant],
        props.className
    )

    return <nav className={classes}>{children}</nav>
}

type NavbarComponent<T, P = {}> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> & {
    Collapse: typeof NavbarCollapse
    CollapseToggle: typeof NavbarCollapseToggle
    CollapseContent: typeof NavbarCollapseContent
    Brand: typeof NavbarBrand
    Content: typeof NavbarContent
    Link: typeof NavbarLink
    Item: typeof NavbarItem
    Group: typeof NavbarGroup
}

export default Navbar as NavbarComponent<HTMLDivElement, NavbarProps>
