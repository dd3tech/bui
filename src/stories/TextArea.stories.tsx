import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TextAreaComponent from '../components/Form/TextArea'
import { SearchCircleIcon } from '@heroicons/react/outline'

export default {
  title: 'Form/TextArea',
  component: TextAreaComponent
} as ComponentMeta<typeof TextAreaComponent>

const Template: ComponentStory<typeof TextAreaComponent> = (args) => (
  <TextAreaComponent {...args} />
)

export const TextArea = Template.bind({})
TextArea.args = {
  label: 'Text area',
  endAdornment: <SearchCircleIcon className="w-5" />,
  message: 'Texto de ayuda',
  placeholder: 'Ejemplo',
  disabled: false
}
