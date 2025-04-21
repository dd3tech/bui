import type { Meta, StoryObj } from '@storybook/react'
import SelectComponentV2 from '../components/Form/SingleSelect'

const meta: Meta<typeof SelectComponentV2> = {
  title: 'Form/SingleSelect',
  component: SelectComponentV2
}

export default meta
type Story = StoryObj<typeof SelectComponentV2>

const optionsList = [
  { value: 0, label: 'Option A' },
  { value: 1, label: 'Label' },
  { value: 2, label: 'Option C', disabled: true },
  { value: 3, label: 'Option D', disabled: false },
  { value: 4, label: 'Option E', disabled: false }
]

export const SingleSelect: Story = {
  args: {
    className: 'w-72',
    label: 'Example',
    isDisabled: false,
    onChange: (event) => console.log({ onChange: event.target.value }),
    optionsList,
    name: 'example',
    placeholder: 'Select an option',
    singleOption: true,
    value: 2
  }
}
