import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ListComponent from '../components/List'

const meta: Meta<typeof ListComponent> = {
  title: 'components/List',
  component: ListComponent
}

export default meta
type Story = StoryObj<typeof ListComponent>

export const List: Story = {
  args: {
    ordered: false,
    gap: 5,
    gapItem: 0,
    icon: '•',
    iconColor: '#000',
    iconSize: 15,
    iconLineHeight: 25,
    prefixLabel: '',
    suffixLabel: '.'
  },
  render: (args) => (
    <ListComponent {...args}>
      <ListComponent.Item>Hey!</ListComponent.Item>
      <ListComponent.Item>Hey!</ListComponent.Item>
      <ListComponent.Item>Hey!</ListComponent.Item>
    </ListComponent>
  )
}
