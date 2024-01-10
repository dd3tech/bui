import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TagsComponents from '../components/Tags/Tags'
import { CheckCircleIcon } from '@heroicons/react/solid'

export default {
  title: 'Components/Tags',
  component: TagsComponents
} as ComponentMeta<typeof TagsComponents>

const Template: ComponentStory<typeof TagsComponents> = (args) => (
  <TagsComponents {...args} />
)

export const Tags = Template.bind({})
Tags.args = {
  text: 'Label tag',
  variant: 'primary',
  rounded: 'md',
  fontSize: 'medium',
  icon: CheckCircleIcon
}
