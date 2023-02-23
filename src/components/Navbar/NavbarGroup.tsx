import { Gap } from 'interfaces/types'
import { composeClasses } from 'lib/classes'

export interface NavbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    hiddenIn?: string
    children?: React.ReactNode
    gap?: Gap
}

const NavbarGroup = ({ hiddenIn, children, gap, ...props }: NavbarGroupProps) => {
    const classes = composeClasses(
        'content-center items-center flex-nowrap',
        hiddenIn ? `hidden ${hiddenIn}:flex` : 'flex',
        gap && `gap-${gap}`,
        props.className
    )

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    )
}

export default NavbarGroup
