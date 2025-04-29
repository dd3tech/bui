import type { Meta, StoryObj } from '@storybook/react'
import MultiSelect from '../components/Form/MultiSelect'
const meta: Meta<typeof MultiSelect> = {
  title: 'Form/MultiSelect',
  component: MultiSelect
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const optionsList = [
  { value: 0, label: 'Option A' },
  { value: 1, label: 'Label' },
  { value: 2, label: 'Option C', disabled: true },
  { value: 3, label: 'Option D', disabled: false },
  { value: 4, label: 'Option E', disabled: false }
]

export const MulltiSelect: Story = {
  args: {
    className: 'w-72',
    label: 'Example',
    isDisabled: false,
    optionsList,
    value: 1,
    buttonSubmit: {
      label: 'Submit',
      onClick: () => alert('submit')
    },
    buttonClear: {
      label: 'Clear',
      onClick: () => alert('clear')
    }
  }
}
