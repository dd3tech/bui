import type { Meta, StoryObj } from '@storybook/react'
import KbdComponent from '../components/Kbd/Kbd'

const meta: Meta<typeof KbdComponent> = {
  title: 'Typography/Kbd',
  component: KbdComponent
}

export default meta
type Story = StoryObj<typeof KbdComponent>

export const Kbd: Story = {
  args: {
    kbds: ['Ctrl', 'Shift', 'R'],
    separator: '+'
  }
}
