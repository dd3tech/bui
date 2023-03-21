import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BadgeComponent from '../components/Badge/Badge'

export default {
  title: 'Components/Badge',
  component: BadgeComponent
} as ComponentMeta<typeof BadgeComponent>

const Template: ComponentStory<typeof BadgeComponent> = (args) => (
  <BadgeComponent {...args} />
)

export const Badge = Template.bind({})
Badge.args = {
  variant: 'infoPrimary',
  icon: 'HomeIcon',
  text: 'Im a Badge',
  classNameIcon: 'w-4 text-blue-600'
}
