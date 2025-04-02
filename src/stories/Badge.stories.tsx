import type { Meta, StoryObj } from '@storybook/react'
import BadgeComponent from '../components/Badge/Badge'

const meta: Meta<typeof BadgeComponent> = {
  title: 'Components/Badge',
  component: BadgeComponent
}

export default meta
type Story = StoryObj<typeof BadgeComponent>

export const Badge: Story = {
  args: {
    variant: 'infoPrimary',
    icon: 'HomeIcon',
    text: 'Im a Badge',
    classNameIcon: 'w-4 text-blue-600'
  }
}
