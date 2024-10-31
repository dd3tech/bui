import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropdownRadio as DropdownRadioComponent } from '../components/Filters'

export default {
  title: 'Filters/DropdownRadio',
  component: DropdownRadioComponent
} as ComponentMeta<typeof DropdownRadioComponent>

const Template: ComponentStory<typeof DropdownRadioComponent> = ({
  cancelText,
  confirmText,
  onSubmit,
  onClose,
  title,
  align,
  options,
  initialValue
}: any) => (
  <DropdownRadioComponent
    cancelText={cancelText}
    confirmText={confirmText}
    onSubmit={onSubmit}
    onClose={onClose}
    title={title}
    align={align}
    options={options}
    initialValue={initialValue}
  />
)

export const DropdownRadio = Template.bind({})
DropdownRadio.args = {
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
