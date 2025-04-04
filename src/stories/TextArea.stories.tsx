import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TextAreaComponent from '../components/Form/TextArea'
import { SearchCircleIcon } from '@heroicons/react/outline'

const meta: Meta<typeof TextAreaComponent> = {
  title: 'Form/TextArea',
  component: TextAreaComponent
}

export default meta
type Story = StoryObj<typeof TextAreaComponent>

export const TextArea: Story = {
  args: {
    label: 'Text area',
    endAdornment: <SearchCircleIcon className="w-5" />,
    message: 'Texto de ayuda',
    placeholder: 'Ejemplo',
    disabled: false
  }
}
