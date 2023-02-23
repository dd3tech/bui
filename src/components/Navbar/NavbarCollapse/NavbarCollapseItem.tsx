import { composeClasses } from 'lib/classes'
import { useNavbarCollapseContext } from './NavbarCollapseContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    showIn: string
}

const NavbarCollapseItem = ({ showIn, children, className, ...props }: Props) => {
    const collapseContext = useNavbarCollapseContext()

    return (
        <div {...props} className={composeClasses(className, `${showIn}:hidden`)} onClick={() => collapseContext?.setIsCollapsed((prev) => !prev)}>
            {children}
        </div>
    )
}

export default NavbarCollapseItem
