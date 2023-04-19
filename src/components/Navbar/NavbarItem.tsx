import { composeClasses } from 'lib/classes'
import { useNavbarContentContext } from './NavbarContentContext'
import { getActiveVariants } from './NavbarLink'

export interface NavbarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  isActive?: boolean
}

const colorVariants: { [key: string]: string } = {
  primary: 'blue',
  success: 'green',
  error: 'red',
  warning: 'yellow'
}

const NavbarItem = ({ children, isActive, ...props }: NavbarItemProps) => {
  const navbarContentContext = useNavbarContentContext()

  const variant = getActiveVariants(
    navbarContentContext.variant,
    colorVariants[navbarContentContext.activeColor]
  )
  const style = isActive ? variant : {}
  const classes = composeClasses(
    'flex content-center items-center flex-nowrap',
    isActive && variant.class,
    isActive ? 'font-bold' : 'text-base',
    props.className
  )

  return (
    <div className={classes} {...props} style={style}>
      {children}
    </div>
  )
}

export default NavbarItem
