import type { Meta, StoryObj } from '@storybook/react'
import { DropdownCheckbox as DropdownCheckboxComponent } from '../components/Filters'

const meta: Meta<typeof DropdownCheckboxComponent> = {
  title: 'Filters/DropdownCheckbox',
  component: DropdownCheckboxComponent
}

export default meta
type Story = StoryObj<typeof DropdownCheckboxComponent>

export const DropdownCheckbox: Story = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    onSubmit: () => console.log('Submit'),
    onClose: () => console.log('Close'),
    title: 'Title',
    align: 'left',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ],
    allText: 'All',
    initialValue: ['option1'],
    className: 'w-24'
  }
}
