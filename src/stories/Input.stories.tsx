import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import InputComponent from '../components/Form/Input'
import { SearchCircleIcon } from '@heroicons/react/outline'

export default {
  title: 'Form/Input',
  component: InputComponent
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => {
  const [value, setValue] = React.useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return <InputComponent {...args} value={value} onChange={handleChange} />
}

export const Input = Template.bind({})
Input.args = {
  label: 'Ejemplo',
  type: 'text',
  variant: 'default',
  disabled: false
}
export const InputWithIcon = Template.bind({})
InputWithIcon.args = {
  label: 'Con Icono',
  startAdornment: <SearchCircleIcon className="w-5" />,
  endAdornment: <SearchCircleIcon className="w-5" />,
  message: 'Mensaje de ayuda',
  className: 'w-80',
  variant: 'default',
  large: true,
  value: 'Valor',
  disabled: false,
  placeholder: 'Placeholder'
}
export const InputCurrency = Template.bind({})
InputCurrency.args = {
  label: 'Currency',
  startAdornment: '$',
  endAdornment: '%',
  className: 'w-96',
  type: 'currency',
  prefix: '$',
  variant: 'success',
  max: 99.95
}
export const InputPassword = Template.bind({})
InputPassword.args = {
  label: 'Password',
  type: 'password',
  className: 'w-full'
}
export const InputEmail = Template.bind({})
InputEmail.args = {
  label: 'Email',
  type: 'email',
  className: 'w-full'
}
export const InputDate = Template.bind({})
InputDate.args = {
  label: 'Date',
  type: 'date',
  className: 'w-full',
  min: new Date().toDateString()
}
export const InputMonth = Template.bind({})
InputMonth.args = {
  label: 'Day',
  type: 'month',
  className: 'w-full'
}
export const InputMonthYear = Template.bind({})
InputMonthYear.args = {
  label: 'Month/Year',
  type: 'month-year',
  className: 'w-full'
}
export const InputYear = Template.bind({})
InputYear.args = {
  label: 'Year',
  type: 'year',
  className: 'w-full'
}
export const InputPercentage = Template.bind({})
InputPercentage.args = {
  label: 'Percentage',
  type: 'percentage',
  className: 'w-56'
}

export const InputNumber = Template.bind({})
InputNumber.args = {
  label: 'Number',
  type: 'number',
  className: 'w-56'
}

export const InputFile = Template.bind({})
InputFile.args = {
  label: 'Upload your documentation',
  type: 'file',
  className: 'w-80'
}
