import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropdownRange as DropdownRangeComponent } from '../components/Filters'

export default {
  title: 'Filters/DropdownRange',
  component: DropdownRangeComponent
} as ComponentMeta<typeof DropdownRangeComponent>

const Template: ComponentStory<typeof DropdownRangeComponent> = ({
  cancelText,
  confirmText,
  onSubmit,
  onClose,
  title,
  align,
  min,
  max,
  initMaxValue,
  initMinValue,
  unitName
}: any) => (
  <DropdownRangeComponent
    cancelText={cancelText}
    confirmText={confirmText}
    onSubmit={onSubmit}
    onClose={onClose}
    title={title}
    align={align}
    min={min}
    max={max}
    initMaxValue={initMaxValue}
    initMinValue={initMinValue}
    unitName={unitName}
  />
)

export const DropdownRange = Template.bind({})
DropdownRange.args = {
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
