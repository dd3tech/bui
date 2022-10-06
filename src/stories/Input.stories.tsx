import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input as InputComponent } from '../components/Form/Input'
import { SearchCircleIcon } from '@heroicons/react/outline'

export default {
    title: 'Form/Input',
    component: InputComponent
} as ComponentMeta<typeof InputComponent>

const Template: ComponentStory<typeof InputComponent> = (args) => <InputComponent {...args} />

export const Input = Template.bind({})
Input.args = {
    label: 'Ejemplo'
}
export const InputWithIcon = Template.bind({})
InputWithIcon.args = {
    label: 'Con Icono',
    endAdorment: <SearchCircleIcon className="w-5 text-gray-500" />,
    startAdorment: <SearchCircleIcon className="w-5 text-gray-500" />,
    className: 'w-60',
    variant: 'active'
}
export const InputCurrency = Template.bind({})
InputCurrency.args = {
    label: 'Currency',
    endAdorment: '$',
    startAdorment: '%',
    className: 'w-full',
    variant: 'active',
    isCurrency: true
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
