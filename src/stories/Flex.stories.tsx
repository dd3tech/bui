import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import FlexComponent from '../components/Layout/Flex/Flex'

const meta: Meta<typeof FlexComponent> = {
  title: 'Layout/Flex',
  component: FlexComponent
}

export default meta
type Story = StoryObj<typeof FlexComponent>

export const Flex: Story = {
  args: {
    className: 'bg-gray-300 h-20 rounded-md',
    children: (
      <>
        <div className="bg-red-500 text-white w-32 p-2 border rounded-sm">
          1st Element
        </div>
        <div className="bg-blue-700 text-white w-32 p-2 border rounded-sm">
          2nd Element
        </div>
      </>
    )
  }
}
