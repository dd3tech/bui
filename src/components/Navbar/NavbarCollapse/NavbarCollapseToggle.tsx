import { composeClasses } from 'lib/classes'
import { SquareMenu } from '../SquareMenu'
import { useNavbarCollapseContext } from './NavbarCollapseContext'

export interface NavbarCollapseToggleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showIn: string
  children?: React.ReactNode
}

const NavbarCollapseToggle = ({
  showIn,
  children,
  className,
  ...props
}: NavbarCollapseToggleProps) => {
  const collapseContext = useNavbarCollapseContext()

  return (
    <div
      {...props}
      className={composeClasses(className, `${showIn}:hidden`)}
      onClick={() => collapseContext?.setIsCollapsed((prev) => !prev)}
    >
      {children ?? <SquareMenu size={20} color="#1D4ED8" />}
    </div>
  )
}

export default NavbarCollapseToggle
