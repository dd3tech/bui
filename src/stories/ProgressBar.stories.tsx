import type { Meta, StoryObj } from '@storybook/react'
import ProgressBarComponent from '../components/ProgressBar'

const meta: Meta<typeof ProgressBarComponent> = {
  title: 'Controls/Progressbar',
  component: ProgressBarComponent
}

export default meta
type Story = StoryObj<typeof ProgressBarComponent>

export const ProgressBar: Story = {
  args: {
    value: 30,
    max: 100
  }
}
