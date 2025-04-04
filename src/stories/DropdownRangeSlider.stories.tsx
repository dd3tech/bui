import type { Meta, StoryObj } from '@storybook/react'
import { DropdownRangeSlider as DropdownRangeSliderComponent } from '../components/Filters'

const meta: Meta<typeof DropdownRangeSliderComponent> = {
  title: 'Filters/DropdownRangeSlider',
  component: DropdownRangeSliderComponent
}

export default meta
type Story = StoryObj<typeof DropdownRangeSliderComponent>

export const DropdownRangeSlider: Story = {
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
