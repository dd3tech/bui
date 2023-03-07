import { composeClasses } from 'lib/classes'
import { NavbarContentVariants } from './NavbarContent'
import { useNavbarContentContext } from './NavbarContentContext'

export interface NavbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
    isActive?: boolean
}

const colorVariants: { [key: string]: string } = {
    primary: 'blue',
    success: 'green',
    danger: 'red',
    warning: 'yellow'
}

export const getActiveItemVariants = (navItemVariant: NavbarContentVariants, activeColor: string) => {
    switch (navItemVariant) {
        case 'underline':
            return `h-16 border-b-3 border-${activeColor}-500`
        case 'highlight':
            return `rounded py-1.5 px-2.5 bg-${activeColor}-100 text-${activeColor}-600`
        default:
            return `text-${activeColor}-600`
    }
}

const NavbarItem = ({ children, isActive, ...props }: NavbarItemProps) => {
    const navbarContentContext = useNavbarContentContext()

    const classes = composeClasses(
        'flex content-center items-center flex-nowrap',
        isActive && getActiveItemVariants(navbarContentContext.variant, colorVariants[navbarContentContext.activeColor]),
        isActive ? 'font-bold' : 'text-base',
        props.className
    )

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    )
}

export default NavbarItem
