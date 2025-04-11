import type { Meta, StoryObj } from '@storybook/react'
import Badge from '../components/Badge/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    value: 7,
    variant: 'default'
  }
}

export const Success: Story = {
  args: {
    value: 12,
    variant: 'success'
  }
}

export const Warning: Story = {
  args: {
    value: 3,
    variant: 'warning'
  }
}

export const Error: Story = {
  args: {
    value: 1,
    variant: 'error'
  }
}
