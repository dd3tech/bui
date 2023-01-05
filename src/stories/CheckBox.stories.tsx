import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Checkbox as CheckboxComponent, FormControlLabel as FormControlLabelComponent } from '../components'

export default {
    title: 'Form/Checkbox',
    component: CheckboxComponent
} as ComponentMeta<typeof CheckboxComponent>

const Template: ComponentStory<typeof CheckboxComponent> = (args) => <CheckboxComponent {...args} />
export const Checkbox = Template.bind({})

Checkbox.args = {
    fontSize: '4xl'
}

const TemplateControl: ComponentStory<typeof FormControlLabelComponent> = (args) => (
    <FormControlLabelComponent {...args} control={<Checkbox {...Checkbox.args} />} />
)

export const CheckBoxWithControl = TemplateControl.bind({})

CheckBoxWithControl.args = {
    label: 'Example',
    labelPlacement: 'top',
    disabled: true
}
