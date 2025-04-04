import type { Meta, StoryObj } from '@storybook/react'
import AnchorComponent from '../components/Anchor'

const meta: Meta<typeof AnchorComponent> = {
  title: 'Navigation/Anchor',
  component: AnchorComponent
}

export default meta
type Story = StoryObj<typeof AnchorComponent>

export const Anchor: Story = {
  args: {
    to: '/?path=/story/navigation-anchor--anchor',
    children: 'Click Anchor',
    className: 'text-primary'
  }
}

export const LinkAnchor: Story = {
  args: {
    to: '/?path=/story/navigation-anchor--link-anchor',
    children: 'Click Link',
    className: 'text-primary'
  }
}
