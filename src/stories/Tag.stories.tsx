import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TagComponents from '../components/Tag/Tag'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default {
  title: 'Components/Tag',
  component: TagComponents
} as ComponentMeta<typeof TagComponents>

const Template: ComponentStory<typeof TagComponents> = (args) => (
  <TagComponents {...args} />
)

export const Tag = Template.bind({})
Tag.args = {
  text: 'Label tag',
  variant: 'primary',
  rounded: 'md',
  fontSize: 'medium',
  icon: CheckCircleIcon
}
