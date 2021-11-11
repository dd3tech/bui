import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input as InputComponent } from './Inputs'

export default {
    title: 'Design System/Forms/Input'
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => <InputComponent {...args} />

export const float_label = Template.bind({})
float_label.args = {
    label: 'Email',
    type: 'email',
    variant: 'float-label',
    name: 'email'
}
