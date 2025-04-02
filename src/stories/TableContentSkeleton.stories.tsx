import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TableContentSkeletonComponent from '../components/Skeleton/TableContentSkeleton'
import TableComp from '../components/Table'

const meta: Meta<typeof TableContentSkeletonComponent> = {
  title: 'Components/Skeletons/TableContentSkeleton',
  component: TableContentSkeletonComponent
}

export default meta
type Story = StoryObj<typeof TableContentSkeletonComponent>

export const TableContentSkeleton: Story = {
  args: {
    rows: 5,
    columns: 6,
    skeletonColor: '#e5e7eb',
    skeletonHeight: '14px',
    rounded: 'full',
    skeletonWidth: ['90%', 50, '80%', '60%'],
    classNameCell: 'px-2 border'
  },
  render: (args) => (
    <TableComp rounded="none">
      <TableComp.Header>
        <TableComp.HeaderRow>
          {[300, 100, 150, 150, 100, 100].map((val, index) => (
            <TableComp.HeaderCell key={index} style={{ minWidth: val }}>
              Loremp
            </TableComp.HeaderCell>
          ))}
        </TableComp.HeaderRow>
      </TableComp.Header>
      <TableComp.Body>
        <TableContentSkeletonComponent {...args} />
      </TableComp.Body>
    </TableComp>
  )
}
