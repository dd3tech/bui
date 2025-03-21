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
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary'
}

const headerRowVariant: { [key: string]: string } = {
  primary: `h-8 ${fontSize.xxs}`,
  secondary: `h-9 ${fontSize.xxs} large-borders`,
  tertiary: `h-9 ${fontSize.xs} full-borders`,
  quaternary: `h-10 ${fontSize.xxs} full-borders`
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
        'bg-gray-50 sticky top-0',
        props.className,
        fontWeight.bold,
        headerRowVariant[variant]
      )}
      style={{ zIndex: 2 }}
    >
      {children}
    </tr>
  )
}

export default HeaderRow
