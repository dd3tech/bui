import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FormControlLabel as FormControlLabelComponent } from '../components'
import { Checkbox } from './CheckBox.stories'

export default {
  title: 'Form/FormControl',
  component: FormControlLabelComponent
} as ComponentMeta<typeof FormControlLabelComponent>

const Template: ComponentStory<typeof FormControlLabelComponent> = (args) => (
  <FormControlLabelComponent {...args} />
)

export const FormControlLabel = Template.bind({})

Checkbox.args = {
  size: '2xl',
  checked: true
}

FormControlLabel.args = {
  label: 'Start',
  labelPlacement: 'end',
  control: <Checkbox {...Checkbox.args} />
}
