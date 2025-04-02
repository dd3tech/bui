import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import RowComponent from '../components/Layout/Row'

const meta: Meta<typeof RowComponent> = {
  title: 'Layout/Row',
  component: RowComponent
}

export default meta
type Story = StoryObj<typeof RowComponent>

export const Row: Story = {
  args: {
    cols: 1,
    md: 2,
    gap: 5,
    children: (
      <>
        <div className="bg-gray-300 text-center h-24">
          <h2>1st Col</h2>
        </div>
        <div className="bg-blue-300 text-center h-24">
          <h2>2nd Col</h2>
        </div>
      </>
    )
  }
}
