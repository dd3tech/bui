import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateTimePicker as DateTimePickerComponent } from '../components'

const meta: Meta<typeof DateTimePickerComponent> = {
  title: 'Components/DateTimePicker',
  component: DateTimePickerComponent,
  argTypes: {
    minDate: { control: 'date' },
    maxDate: { control: 'date' }
  }
}

export default meta
type Story = StoryObj<typeof DateTimePickerComponent>

export const DateTimePicker: Story = {
  args: {
    language: 'en',
    format: 'short',
    value: '29/03/2024 09:00 AM',
    handleDateChange: (date) =>
      console.log('--from handleDateChange-- \n', date),
    minDate: new Date(2024, 2, 12, 1, 30)
  },
  render: (args) => {
    const minDate =
      typeof args.minDate === 'number' ? new Date(args.minDate) : args.minDate
    const maxDate =
      typeof args.maxDate === 'number' ? new Date(args.maxDate) : args.maxDate
    return (
      <DateTimePickerComponent {...args} minDate={minDate} maxDate={maxDate} />
    )
  }
}
