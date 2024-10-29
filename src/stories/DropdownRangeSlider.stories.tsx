import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DropdownRangeSlider as DropdownRangeSliderComponent } from '../components/Filters'

export default {
  title: 'Filters/DropdownRangeSlider',
  component: DropdownRangeSliderComponent
} as ComponentMeta<typeof DropdownRangeSliderComponent>

const Template: ComponentStory<typeof DropdownRangeSliderComponent> = ({
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
  <DropdownRangeSliderComponent
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

export const DropdownRangeSlider = Template.bind({})
DropdownRangeSlider.args = {
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
