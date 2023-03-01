import { composeClasses } from 'lib/classes'
import { Rounded } from '../../interfaces/types'
import Header from './base/Header'
import HeaderRow from './base/HeaderRow'
import HeaderCell from './base/HeaderCell'
import Body from './base/Body'
import Row from './base/Row'
import Cell from './base/Cell'
import Accordion from './base/Accordion'
import './table.css'

interface TableProps {
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

const Table = ({ children, bordered = true, horizontalBorders = true, verticalBorders = true, rounded = 'lg', className }: TableProps) => {
    return (
        <div
            className={composeClasses(
                'table-container-cmpnt',
                className,
                bordered && 'bordered',
                horizontalBorders && 'horizontal-borders',
                verticalBorders && 'vertical-borders',
                `rounded-${rounded}`,
                'border-gray-400 overflow-auto'
            )}
        >
            <table className="w-full border-collapse">{children}</table>
        </div>
    )
}

Table.Header = Header
Table.HeaderRow = HeaderRow
Table.HeaderCell = HeaderCell
Table.Body = Body
Table.Row = Row
Table.Cell = Cell
Table.Accordion = Accordion

Table.displayName = 'Table'

export default Table
