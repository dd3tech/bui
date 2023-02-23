import { composeClasses } from 'lib/classes'
import { Anchor } from '../Navigation/Navigation'
import { NavbarContentVariants } from './NavbarContent'
import { useNavbarContentContext } from './NavbarContentContext'

export interface NavbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode
    to: string
    isActive?: boolean
    LinkComponent?: React.ComponentType<any>
}

const colorVariants: { [key: string]: string } = {
    primary: 'blue',
    success: 'green',
    danger: 'red',
    warning: 'yellow'
}

export const getActiveVariants = (navLinkVariant: NavbarContentVariants, activeColor: string) => {
    switch (navLinkVariant) {
        case 'underline':
            return `h-16 border-b-3 border-${activeColor}-500`
        case 'highlight':
            return `rounded py-1.5 px-2.5 bg-${activeColor}-100 text-${activeColor}-600`
        default:
            return `text-${activeColor}-600`
    }
}

const NavbarLink = ({ children, to, isActive, LinkComponent, ...props }: NavbarLinkProps) => {
    const navbarContentContext = useNavbarContentContext()

    const classes = composeClasses(
        'flex content-center items-center flex-nowrap',
        isActive && getActiveVariants(navbarContentContext.variant, colorVariants[navbarContentContext.activeColor]),
        isActive ? 'font-bold' : 'text-base',
        props.className
    )

    return (
        <Anchor LinkComponent={LinkComponent} to={to} className={classes} {...props}>
            {children}
        </Anchor>
    )
}

export default NavbarLink
