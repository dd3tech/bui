import type { Meta, StoryObj } from '@storybook/react'
import { ActiveButton as ActiveButtonComponent } from '../components'

const meta: Meta<typeof ActiveButtonComponent> = {
  title: 'Buttons/ActiveButton',
  component: ActiveButtonComponent
}

export default meta
type Story = StoryObj<typeof ActiveButtonComponent>

export const ActiveButton: Story = {
  args: {
    active: true,
    to: () => alert('Esto puede ser un redirect'),
    children: 'Active Button'
  }
}
