import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DividerComponent from '../components/Divider'

const meta: Meta<typeof DividerComponent> = {
  title: 'Layout/Divider',
  component: DividerComponent
}

export default meta
type Story = StoryObj<typeof DividerComponent>

export const Divider: Story = {
  args: {
    variant: 'middle',
    size: 'small',
    light: true,
    vertical: false
  },
  render: (args) => (
    <div
      className={`flex w-max min-h-full border border-gray-200 rounded ${
        args.vertical ? '' : 'flex-col'
      }`}
    >
      <span className="m-3">Element 1</span>
      <DividerComponent {...args} />
      <span className="m-3">Element 2</span>
    </div>
  )
}

export const DividerFull: Story = {
  args: {
    variant: 'full',
    size: 'small',
    light: true,
    vertical: true
  },
  render: (args) => (
    <div
      className={`flex w-max min-h-full border border-gray-200 rounded ${
        args.vertical ? '' : 'flex-col'
      }`}
    >
      <span className="m-3">Element 1</span>
      <DividerComponent {...args} />
      <span className="m-3">Element 2</span>
    </div>
  )
}
