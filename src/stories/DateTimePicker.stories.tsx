import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DateTimePicker as DateTimePickerComponent } from '../components'

export default {
  title: 'Components/DateTimePicker',
  component: DateTimePickerComponent,
  argTypes: {
    minDate: { control: 'date' },
    maxDate: { control: 'date' }
  }
} as ComponentMeta<typeof DateTimePickerComponent>

const Template: ComponentStory<typeof DateTimePickerComponent> = (args) => {
  args.minDate =
    typeof args.minDate === 'number' ? new Date(args.minDate) : args.minDate
  args.maxDate =
    typeof args.maxDate === 'number' ? new Date(args.maxDate) : args.maxDate
  return <DateTimePickerComponent {...args} />
}

export const DateTimePicker = Template.bind({})
DateTimePicker.args = {
  language: 'en',
  format: 'short',
  value: '29/03/2024 09:00 AM',
  handleDateChange: (date) => console.log('--from handleDateChange-- \n', date),
  minDate: new Date(2024, 2, 12, 1, 30)
}
