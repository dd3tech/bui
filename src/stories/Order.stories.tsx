import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Order from '../components/Layout/Order/Order'

const meta: Meta<typeof Order> = {
  title: 'Layout/Order',
  component: Order
}

export default meta
type Story = StoryObj<typeof Order>

export const Default: Story = {
  args: {
    order: 'last',
    children: 'My custom order component'
  },
  render: (args) => (
    <div className="flex justify-between bg-gray-200">
      <Order {...args} />
      <Order order="1">Order 1</Order>
      <Order order="2">Order 2</Order>
    </div>
  )
}
