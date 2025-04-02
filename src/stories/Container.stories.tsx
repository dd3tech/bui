import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ContainerComponent from '../components/Layout/Container'

const meta: Meta<typeof ContainerComponent> = {
  title: 'Layout/Container',
  component: ContainerComponent
}

export default meta
type Story = StoryObj<typeof ContainerComponent>

export const Classic: Story = {
  args: {
    className: 'bg-gray-200 h-20',
    children: <h2 className="text-center pt-2">This is a Container</h2>
  }
}

export const Shadow: Story = {
  args: {
    className: 'h-24',
    shadow: 'lg',
    children: <h2 className="text-center pt-2">This is a Container Shadow</h2>
  }
}

export const Rounded: Story = {
  args: {
    className: 'bg-gray-200 h-24',
    shadow: 'lg',
    rounded: 'lg',
    children: <h2 className="text-center pt-2">This is a Container Shadow</h2>
  }
}
