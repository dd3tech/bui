import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ArrowSelector as ArrowSelectorComponent } from '../components/Filters'

export default {
  title: 'Filters/ArrowSelector',
  component: ArrowSelectorComponent
} as ComponentMeta<typeof ArrowSelectorComponent>

const Template: ComponentStory<typeof ArrowSelectorComponent> = ({
  label,
  onClickLeft,
  onClickRight
}: any) => (
  <ArrowSelectorComponent
    label={label}
    onClickLeft={onClickLeft}
    onClickRight={onClickRight}
  />
)

export const ArrowSelector = Template.bind({})
ArrowSelector.args = {
  label: 'Label',
  onClickLeft: () => console.log('Left'),
  onClickRight: () => console.log('Right')
}
