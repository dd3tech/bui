import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DynamicHeroIcon as DynamicHeroIconComponent } from '../common/DynamicHeroIcon'

export default {
  title: 'Components/DynamicHeroIcon',
  component: DynamicHeroIconComponent
} as ComponentMeta<typeof DynamicHeroIconComponent>

const Template: ComponentStory<typeof DynamicHeroIconComponent> = (args) => (
  <DynamicHeroIconComponent {...args} />
)

export const DynamicHeroIcon = Template.bind({})
DynamicHeroIcon.args = {
  icon: 'CameraIcon',
  className: 'text-gray-500 bold',
  width: 30
}
