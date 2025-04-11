import type { Meta, StoryObj } from '@storybook/react'
import ChipComponent from '../components/Chip/Chip'

const meta: Meta<typeof ChipComponent> = {
  title: 'Components/Chip',
  component: ChipComponent
}

export default meta
type Story = StoryObj<typeof ChipComponent>

export const Chip: Story = {
  args: {
    variant: 'infoPrimary',
    icon: 'HomeIcon',
    text: 'Im a Chip',
    classNameIcon: 'w-4 text-blue-600'
  }
}
