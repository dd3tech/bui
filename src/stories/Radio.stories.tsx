import type { Meta, StoryObj } from '@storybook/react'
import { Radio as RadioComponent } from '../components'

const meta: Meta<typeof RadioComponent> = {
  title: 'Buttons/Radio',
  component: RadioComponent,
  args: {
    label: 'Lorem A',
    value: 'a',
    name: 'radio-buttons',
    inputProps: { 'aria-label': 'A' },
    color: 'primary'
  }
}

export default meta
type Story = StoryObj<typeof RadioComponent>

export const Radio: Story = {
  args: {
    checked: true,
    disabled: false,
    error: false
  }
}

export const RadioDisabledSelelected: Story = {
  args: {
    checked: true,
    disabled: true,
    error: false
  }
}

export const RadioError: Story = {
  args: {
    checked: false,
    disabled: false,
    error: true
  }
}
