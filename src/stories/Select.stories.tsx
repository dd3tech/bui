import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ExclamationCircleIcon } from '@heroicons/react/outline'
import SelectComponent from '../components/Form/Select'

const meta: Meta<typeof SelectComponent> = {
  title: 'Form/Select',
  component: SelectComponent
}

export default meta
type Story = StoryObj<typeof SelectComponent>

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

export const SelectWithIcon: Story = {
  args: {
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
}

export const Select: Story = {
  args: {
    variant: 'disabled',
    optionsList,
    value: 'A'
  }
}
