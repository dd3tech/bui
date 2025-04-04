import type { Meta, StoryObj } from '@storybook/react'
import { Stepper as StepperComponent } from '../components'

const meta: Meta<typeof StepperComponent> = {
  title: 'Controls/Stepper',
  component: StepperComponent
}

export default meta
type Story = StoryObj<typeof StepperComponent>

export const Stepper: Story = {
  args: {
    phase: 1,
    totalPhases: 1,
    width: '5rem'
  }
}
