import type { Meta, StoryObj } from '@storybook/react'
import TagComponents from '../components/Tag/Tag'
import { CheckCircleIcon } from '@heroicons/react/solid'

const meta: Meta<typeof TagComponents> = {
  title: 'Components/Tag',
  component: TagComponents
}

export default meta
type Story = StoryObj<typeof TagComponents>

export const Tag: Story = {
  args: {
    text: 'Label tag',
    variant: 'primary',
    rounded: 'md',
    fontSize: 'medium',
    icon: CheckCircleIcon
  }
}
