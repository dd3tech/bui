import type { Meta, StoryObj } from '@storybook/react'
import { Progress as ProgressComponent } from '../components/Progress'

const meta: Meta<typeof ProgressComponent> = {
  title: 'components/Progress',
  component: ProgressComponent
}

export default meta
type Story = StoryObj<typeof ProgressComponent>

export const Progress: Story = {
  args: {
    type: 'circle',
    value: 25,
    width: 300,
    height: 6,
    circleSize: 100,
    lineWidth: 10,
    indeterminate: false,
    progressLineColor: '#1d4ed8',
    backgroundLineColor: '#e5e7eb'
  }
}
