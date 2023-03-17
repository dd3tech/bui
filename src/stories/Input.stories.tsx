import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import InputComponent from '../components/Form/Input'
import { SearchCircleIcon, PhoneIcon } from '@heroicons/react/outline'
import Select from '../components/Form/Select'
import Divider from '../components/Divider/Divider'

export default {
    title: 'Form/Input',
    component: InputComponent
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => <InputComponent {...args} />

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
    disabled: false
}
export const InputCurrency = Template.bind({})
InputCurrency.args = {
    label: 'Currency',
    endAdornment: '$',
    startAdornment: '%',
    className: 'w-full',
    variant: 'active',
    type: 'currency'
}
export const InputPassword = Template.bind({})
InputPassword.args = {
    label: 'Password',
    type: 'password',
    className: 'w-full',
    variant: 'active'
}
export const InputEmail = Template.bind({})
InputEmail.args = {
    label: 'Email',
    type: 'email',
    className: 'w-full',
    variant: 'active'
}
export const InputDate = Template.bind({})
InputDate.args = {
    label: 'Date',
    type: 'date',
    className: 'w-full',
    variant: 'active'
}
export const InputMonth = Template.bind({})
InputMonth.args = {
    label: 'Day',
    type: 'month',
    className: 'w-full',
    variant: 'active'
}
export const InputYear = Template.bind({})
InputYear.args = {
    label: 'Year',
    type: 'year',
    className: 'w-full',
    variant: 'active'
}
export const InputPercentage = Template.bind({})
InputPercentage.args = {
    label: 'Percentage',
    type: 'percentage',
    className: 'w-56',
    variant: 'active'
}

export const InputNumber = Template.bind({})
InputNumber.args = {
    label: 'Number',
    type: 'number',
    className: 'w-56',
    variant: 'active'
}

export const InputFile = Template.bind({})
InputFile.args = {
    label: 'Upload your documentation',
    type: 'file',
    className: 'w-80',
    variant: 'active'
}
