import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import SelectComponent from '../components/Form/Select'

export default {
  title: 'Form/Select',
  component: SelectComponent
} as ComponentMeta<typeof SelectComponent>

const Template: ComponentStory<typeof SelectComponent> = (args) => (
  <SelectComponent {...args} />
)

const optionsList = {
  A: {
    label: 'Option A'
  },
  B: 'Label',
  C: {
    label: 'Option C',
    disabled: true
  },
  D: {
    label: 'Option D',
    disabled: false,
    selected: false
  },
  'Option E': {
    disabled: false
  }
}

export const SelectWithIcon = Template.bind({})
SelectWithIcon.args = {
  label: 'Example',
  startAdornment: <ExclamationCircleIcon className="w-5" />,
  disabled: false,
  variant: 'default',
  rounded: 'lg',
  message: 'Lorem ipsum dolor',
  onChange: (event) => console.log({ onChange: event.target.value }),
  onFocus: (event) => console.log({ onFocus: event.target.value }),
  onBlur: (event) => console.log({ onBlur: event.target.value }),
  optionsList,
  name: 'example',
  placeholder: 'Select an option'
}

export const Select = Template.bind({})
Select.args = {
  variant: 'disabled',
  optionsList,
  value: 'A'
}
