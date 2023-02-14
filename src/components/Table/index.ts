export { default as GeneralTable } from './GeneralTable'

import { default as Table } from './Table'
import { Cell, Row, Header, Body, HeaderCell, HeaderRow, AccordionGroup } from './base'

Table.Header = Header
Table.HeaderRow = HeaderRow
Table.HeaderCell = HeaderCell
Table.Body = Body
Table.Row = Row
Table.Cell = Cell
Table.AccordionGroup = AccordionGroup

export default Table
