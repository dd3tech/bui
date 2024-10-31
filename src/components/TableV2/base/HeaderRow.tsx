import { composeClasses } from 'lib/classes'
import { fontSize, fontWeight } from 'lib/font'

export interface HeaderRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   *  Row content
   */
  children?: React.ReactNode
  /**
   * Row variants
   */
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const headerRowVariant: { [key: string]: string } = {
  primary: `h-8 ${fontSize.xxs} bg-gray-50 relative`,
  secondary: `${fontSize.xxs} h-10 text-info`
}

const HeaderRow = ({
  variant = 'primary',
  children,
  ...props
}: HeaderRowProps) => {
  return (
    <tr
      {...props}
      className={composeClasses(
        props.className,
        fontWeight.bold,
        headerRowVariant[variant]
      )}
    >
      {children}
    </tr>
  )
}

export default HeaderRow
