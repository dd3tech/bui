import { composeClasses } from 'lib/classes'
import { NavbarContentVariants } from './NavbarContent'
import { useNavbarContentContext } from './NavbarContentContext'
import Anchor from 'components/Anchor'

export interface NavbarLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode
  to: string
  isActive?: boolean
  LinkComponent?: React.ComponentType<any>
}

const colorVariants: { [key: string]: string } = {
  primary: 'var(--primary)',
  success: 'var(--success)',
  error: 'var(--error)',
  warning: 'var(--warning)'
}

export const getActiveVariants = (
  navItemVariant: NavbarContentVariants,
  activeColor: string
) => {
  switch (navItemVariant) {
    case 'underline':
      return { class: `h-16 border-b-3`, borderColor: activeColor }
    case 'highlight':
      return {
        class: `rounded py-1.5 px-2.5`,
        backgroundColor: `color-mix(in srgb, ${activeColor} 10%, white)`,
        color: activeColor
      }
    default:
      return { color: activeColor }
  }
}

const NavbarLink = ({
  children,
  to,
  isActive,
  LinkComponent,
  ...props
}: NavbarLinkProps) => {
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
    <Anchor
      as={LinkComponent}
      to={to}
      className={classes}
      {...props}
      style={style}
    >
      {children}
    </Anchor>
  )
}

export default NavbarLink
