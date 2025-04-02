import type { Meta, StoryObj } from '@storybook/react'
import { DropdownRange as DropdownRangeComponent } from '../components/Filters'

const meta: Meta<typeof DropdownRangeComponent> = {
  title: 'Filters/DropdownRange',
  component: DropdownRangeComponent
}

export default meta
type Story = StoryObj<typeof DropdownRangeComponent>

export const DropdownRange: Story = {
  args: {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    onSubmit: () => console.log('Submit'),
    onClose: () => console.log('Close'),
    title: 'Title',
    align: 'left',
    min: 0,
    max: 100,
    initMaxValue: 50,
    initMinValue: 10,
    unitName: 'Unit',
    className: 'w-24'
  }
}
