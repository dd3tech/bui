export { default as GeneralTable } from './GeneralTable'

import { default as Table } from './Table'
import { Cell, Row, Header, Body, HeaderCell, HeaderRow, Accordion } from './base'

Table.Header = Header
Table.HeaderRow = HeaderRow
Table.HeaderCell = HeaderCell
Table.Body = Body
Table.Row = Row
Table.Cell = Cell
Table.Accordion = Accordion

export default Table
