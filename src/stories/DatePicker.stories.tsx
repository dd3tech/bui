import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker as DatePickerComponent } from '../components'

const meta: Meta<typeof DatePickerComponent> = {
  title: 'Components/DatePicker',
  component: DatePickerComponent,
  argTypes: {
    minDate: { control: 'object' }
  }
}

export default meta
type Story = StoryObj<typeof DatePickerComponent>

export const DatePicker: Story = {
  args: {
    format: 'short',
    language: 'en',
    value: new Date('02, 27, 2023'),
    minDate: new Date('02, 11, 2023')
  }
}
