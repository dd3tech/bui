import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TableContentSkeletonComponent from '../components/TableContentSkeleton/TableContentSkeleton'
import TableComp from '../components/Table'

export default {
  title: 'Components/Skeletons/TableContentSkeleton',
  component: TableContentSkeletonComponent
} as ComponentMeta<typeof TableContentSkeletonComponent>

const Template: ComponentStory<typeof TableContentSkeletonComponent> = (
  args
) => (
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

export const Skeleton = Template.bind({})
Skeleton.args = {
  rows: 5,
  columns: 6,
  skeletonColor: '#e5e7eb',
  skeletonHeight: '14px',
  rounded: 'full',
  skeletonWidth: ['90%', 50, '80%', '60%'],
  classNameCell: 'px-2 border'
}
