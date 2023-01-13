import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { DatePicker as DatePickerComponent } from '../components'

export default {
    title: 'Components/DatePicker',
    component: DatePickerComponent
} as ComponentMeta<typeof DatePickerComponent>

const Template: ComponentStory<typeof DatePickerComponent> = (args) => <DatePickerComponent {...args} />

export const DatePicker = Template.bind({})
DatePicker.args = {
    format: 'short',
    language: 'en',
    value: new Date('01, 14, 2023')
}
