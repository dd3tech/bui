import type { Meta, StoryObj } from '@storybook/react'
import { DropdownRadio as DropdownRadioComponent } from '../components/Filters'

const meta: Meta<typeof DropdownRadioComponent> = {
  title: 'Filters/DropdownRadio',
  component: DropdownRadioComponent
}

export default meta
type Story = StoryObj<typeof DropdownRadioComponent>

export const DropdownRadio: Story = {
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
    initialValue: 'option1',
    className: 'w-24'
  }
}
