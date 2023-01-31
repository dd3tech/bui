import { ExclamationCircleIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import SelectComponent from '../components/Form/Select'

export default {
    title: 'Form/Select',
    component: SelectComponent
} as ComponentMeta<typeof SelectComponent>

const Template: ComponentStory<typeof SelectComponent> = (args) => <SelectComponent {...args} />

const optionsList = {
    A: {
        label: 'Option A'
    },
    B: {
        label: 'Option B'
    },
    C: {
        label: 'Option C',
        disabled: true
    }
}

export const SelectOutlined = Template.bind({})
SelectOutlined.args = {
    label: 'Example',
    startAdornment: <ExclamationCircleIcon className="w-5" />,
    disabled: false,
    variant: 'outlined',
    rounded: 'lg',
    message: 'Lorem ipsum dolor',
    onChange: (event) => console.log({ onChange: event.target.value }),
    onFocus: (event) => console.log({ onFocus: event.target.value }),
    onBlur: (event) => console.log({ onBlur: event.target.value }),
    optionsList
}

export const SelectStandard = Template.bind({})
SelectStandard.args = {
    label: 'Example',
    disabled: false,
    variant: 'standard',
    message: 'Lorem ipsum dolor',
    error: true,
    optionsList
}

export const Select = Template.bind({})
Select.args = {
    disabled: false,
    variant: 'none',
    optionsList
}
