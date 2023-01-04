import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Radio as RadioComponent } from '../components'

export default {
    title: 'Buttons/Radio',
    component: RadioComponent,
    args: {
        label: 'Lorem A',
        value: 'a',
        name: 'radio-buttons',
        inputProps: { 'aria-label': 'A' },
        color: 'primary'
    }
} as ComponentMeta<typeof RadioComponent>

const Template: ComponentStory<typeof RadioComponent> = (args) => <RadioComponent {...args} />

export const Radio = Template.bind({})
Radio.args = {
    checked: true,
    disabled: false,
    error: false
}

export const RadioDisabledSelelected = Template.bind({})
RadioDisabledSelelected.args = {
    checked: true,
    disabled: true,
    error: false
}

export const RadioError = Template.bind({})
RadioError.args = {
    checked: false,
    disabled: false,
    error: true
}
