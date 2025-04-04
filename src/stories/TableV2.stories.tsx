import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TableV2Comp from '../components/TableV2/TableV2'

const meta: Meta<typeof TableV2Comp> = {
  title: 'Components/TableV2',
  component: TableV2Comp
}

export default meta
type Story = StoryObj<typeof TableV2Comp>

export const TableV2: Story = {
  render: () => {
    const columns = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm'
    ]

    return (
      <div>
        <TableV2Comp>
          <TableV2Comp.Header>
            <TableV2Comp.HeaderRow>
              <TableV2Comp.HeaderCell
                style={{ minWidth: 108 }}
                stickyShadow
                stickyLeft="0px"
              >
                Column Head
              </TableV2Comp.HeaderCell>
              {columns.map((val) => (
                <TableV2Comp.HeaderCell
                  key={val}
                  style={{ minWidth: 108 }}
                  showSortIcon
                  onSort={(sort) => console.log(sort)}
                >
                  Column Head
                </TableV2Comp.HeaderCell>
              ))}
              <TableV2Comp.HeaderCell
                style={{ minWidth: 108 }}
                leftStickyShadow
                stickyRight="0px"
              >
                Column Head
              </TableV2Comp.HeaderCell>
            </TableV2Comp.HeaderRow>
          </TableV2Comp.Header>
          <TableV2Comp.Body>
            <TableV2Comp.Row>
              <TableV2Comp.Cell stickyShadow stickyLeft="0px">
                Cell
              </TableV2Comp.Cell>
              {columns.map((val) => (
                <TableV2Comp.Cell key={val}>Cell</TableV2Comp.Cell>
              ))}
              <TableV2Comp.Cell leftStickyShadow stickyRight="0px">
                Cell
              </TableV2Comp.Cell>
            </TableV2Comp.Row>
            <TableV2Comp.Row>
              <TableV2Comp.Cell stickyShadow stickyLeft="0px">
                Cell
              </TableV2Comp.Cell>
              {columns.map((val) => (
                <TableV2Comp.Cell key={val}>Cell</TableV2Comp.Cell>
              ))}
              <TableV2Comp.Cell leftStickyShadow stickyRight="0px">
                Cell
              </TableV2Comp.Cell>
            </TableV2Comp.Row>
          </TableV2Comp.Body>
        </TableV2Comp>
      </div>
    )
  }
}
