import { composeClasses } from 'lib/classes'
import { Rounded } from 'interfaces'
import Header from './base/Header'
import HeaderRow from './base/HeaderRow'
import HeaderCell from './base/HeaderCell'
import Body from './base/TableBody'
import Row from './base/TableRow'
import Cell from './base/TableCell'
import InputCell from './base/TableInputCell'
import './base/tableV2.css'

export interface TableV2Props extends React.HTMLAttributes<HTMLTableElement> {
  /**
   * Table content
   */
  children?: React.ReactNode
  /**
   * Set border around table
   */
  bordered?: boolean
  /**
   * Rounding of the edges
   */
  rounded?: Rounded
  /**
   * set horizontal borders
   */
  horizontalBorders?: boolean
  /**
   * set vertial borders
   */
  verticalBorders?: boolean
  /**
   * The class name to apply to
   * the container element of the table
   */
  className?: string
}

export const TableV2 = ({
  children,
  rounded = 'lg',
  horizontalBorders = true,
  verticalBorders = true,
  className,
  ...props
}: TableV2Props) => {
  return (
    <div
      className={composeClasses(
        'tableV2-container-cmpnt',
        className,
        horizontalBorders && 'horizontal-borders',
        verticalBorders && 'vertical-borders',
        `rounded-${rounded}`,
        'border border-gray-200 overflow-auto bg-white'
      )}
    >
      <table {...props} className="w-full border-collapse">
        {children}
      </table>
    </div>
  )
}

TableV2.Header = Header
TableV2.HeaderRow = HeaderRow
TableV2.HeaderCell = HeaderCell
TableV2.Body = Body
TableV2.Row = Row
TableV2.Cell = Cell
TableV2.InputCell = InputCell

TableV2.displayName = 'TableV2'

export default TableV2
