import { composeClasses } from 'lib/classes'
import { SquareMenu } from '../SquareMenu'
import { useNavbarCollapseContext } from './NavbarCollapseContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    showIn: string
    children?: React.ReactNode
}

const NavbarCollapseToggle = ({ showIn, children, className, ...props }: Props) => {
    const collapseContext = useNavbarCollapseContext()

    return (
        <div {...props} className={composeClasses(className, `${showIn}:hidden`)} onClick={() => collapseContext?.setIsCollapsed((prev) => !prev)}>
            {children ?? <SquareMenu size={20} color="#1D4ED8" />}
        </div>
    )
}

export default NavbarCollapseToggle
