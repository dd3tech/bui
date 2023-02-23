import { composeClasses } from 'lib/classes'

export interface NavbarBrandProps extends React.HTMLAttributes<HTMLDivElement> {
    hiddenIn?: string
    children?: React.ReactNode
}

const NavbarBrand = ({ hiddenIn, children, ...props }: NavbarBrandProps) => {
    return (
        <div {...props} className={composeClasses('items-center gap-2', hiddenIn ? `hidden ${hiddenIn}:flex` : 'flex', props.className)}>
            {children}
        </div>
    )
}

export default NavbarBrand
