import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Checkbox as CheckboxComponent } from '../components'

export default {
    title: 'Form/Checkbox',
    component: CheckboxComponent
} as ComponentMeta<typeof CheckboxComponent>

const Template: ComponentStory<typeof CheckboxComponent> = (args) => <CheckboxComponent {...args} />

export const Checkbox = Template.bind({})

Checkbox.args = {
    size: '4xl',
    defaultChecked: true,
}
