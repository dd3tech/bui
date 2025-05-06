import { composeClasses } from 'lib/classes'
import { fontSize, fontWeight } from 'lib/font'

export interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   *  Row content
   */
  children?: React.ReactNode
  /**
   *  Row variants
   * highlight: commonly used to display a highlighted row
   * result: commonly used to display a row of totals
   * summary: commonly used to display a summary row
   * accumulate: commonly used to display an accumulate row
   * default: apply the base styles
   */
  variant?: 'highlight' | 'result' | 'default' | 'summary' | 'accumulate'
}

const rowVariant: { [key: string]: string } = {
  default: `${fontSize.xxs} h-7 text-gray-700 bg-transparent`,
  highlight: `${fontSize.xxs} text-gray-900 bg-gray-100 hover:bg-gray-100`,
  result: `${fontSize.xxs} text-gray-900 bg-gray-50`,
  summary: `${fontSize.xxs} bg-gray-700 hover:bg-gray-700 text-white`,
  accumulate: `${fontSize.xxs} text-white bg-surface hover:bg-surface`
}

const Row = ({ variant = 'default', ...props }: RowProps) => {
  return (
    <tr
      {...props}
      className={composeClasses(
        props.className,
        'hover:bg-gray-50 group',
        fontWeight.medium,
        rowVariant[variant]
      )}
    >
      {props.children}
    </tr>
  )
}

export default Row
