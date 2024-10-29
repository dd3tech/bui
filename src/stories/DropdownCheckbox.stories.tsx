import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropdownCheckbox as DropdownCheckboxComponent } from '../components/Filters'

export default {
  title: 'Filters/DropdownCheckbox',
  component: DropdownCheckboxComponent
} as ComponentMeta<typeof DropdownCheckboxComponent>

const Template: ComponentStory<typeof DropdownCheckboxComponent> = ({
  cancelText,
  confirmText,
  onSubmit,
  onClose,
  title,
  align,
  options,
  allText,
  initialValue
}: any) => (
  <DropdownCheckboxComponent
    cancelText={cancelText}
    confirmText={confirmText}
    onSubmit={onSubmit}
    onClose={onClose}
    title={title}
    align={align}
    options={options}
    allText={allText}
    initialValue={initialValue}
  />
)

export const DropdownCheckbox = Template.bind({})
DropdownCheckbox.args = {
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
