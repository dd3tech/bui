import { composeClasses } from 'lib/classes'
import { fontSize, fontWeight } from 'lib/font'

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   *  Row content
   */
  children?: React.ReactNode
  /**
   *  Row variants
   * header: commonly used to display a row of titles
   * result: commonly used to display a row of totals
   * default: apply the base styles
   */
  variant?: 'header' | 'result' | 'default'
}

const rowVariant: { [key: string]: string } = {
  default: `${fontSize.xxs} h-7 text-gray-700 bg-transparent`,
  header: `${fontSize.sm} ${fontWeight.bold} text-gray-900 bg-gray-100`,
  result: `${fontSize.xs} ${fontWeight.bold} text-gray-700 bg-gray-50`
}

const Row = ({ variant = 'default', ...props }: RowProps) => {
  return (
    <tr
      {...props}
      className={composeClasses(
        props.className,
        'hover:bg-gray-50',
        fontWeight.medium,
        rowVariant[variant]
      )}
    >
      {props.children}
    </tr>
  )
}

export default Row
