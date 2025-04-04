import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import InputComponent from '../components/Form/Input'
import { SearchCircleIcon } from '@heroicons/react/outline'

const meta: Meta<typeof InputComponent> = {
  title: 'Form/Input',
  component: InputComponent
}

export default meta
type Story = StoryObj<typeof InputComponent>

const InputTemplate: Story = {
  render: (args) => {
    const [value, setValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }

    return <InputComponent {...args} value={value} onChange={handleChange} />
  }
}

export const Input: Story = {
  ...InputTemplate,
  args: {
    label: 'Ejemplo',
    type: 'text',
    variant: 'default',
    disabled: false
  }
}

export const InputWithIcon: Story = {
  ...InputTemplate,
  args: {
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
}

export const InputCurrency: Story = {
  ...InputTemplate,
  args: {
    label: 'Currency',
    startAdornment: '$',
    endAdornment: '%',
    className: 'w-96',
    type: 'currency',
    prefix: '$',
    variant: 'success',
    max: 99.95
  }
}

export const InputPassword: Story = {
  ...InputTemplate,
  args: {
    label: 'Password',
    type: 'password',
    className: 'w-full'
  }
}

export const InputEmail: Story = {
  ...InputTemplate,
  args: {
    label: 'Email',
    type: 'email',
    className: 'w-full'
  }
}

export const InputDate: Story = {
  ...InputTemplate,
  args: {
    label: 'Date',
    type: 'date',
    className: 'w-full',
    min: new Date().toDateString()
  }
}

export const InputMonth: Story = {
  ...InputTemplate,
  args: {
    label: 'Day',
    type: 'month',
    className: 'w-full'
  }
}

export const InputMonthYear: Story = {
  ...InputTemplate,
  args: {
    label: 'Month/Year',
    type: 'month-year',
    className: 'w-full'
  }
}

export const InputYear: Story = {
  ...InputTemplate,
  args: {
    label: 'Year',
    type: 'year',
    className: 'w-full'
  }
}

export const InputPercentage: Story = {
  ...InputTemplate,
  args: {
    label: 'Percentage',
    type: 'percentage',
    className: 'w-56'
  }
}

export const InputNumber: Story = {
  ...InputTemplate,
  args: {
    label: 'Number',
    type: 'number',
    className: 'w-56'
  }
}

export const InputFile: Story = {
  ...InputTemplate,
  args: {
    label: 'Upload your documentation',
    type: 'file',
    className: 'w-80'
  }
}
