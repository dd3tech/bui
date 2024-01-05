import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import AnchorComponent from '../components/Anchor'

export default {
  title: 'Navigation/Anchor',
  component: AnchorComponent
} as ComponentMeta<typeof AnchorComponent>

const Template: ComponentStory<typeof AnchorComponent> = (args) => (
  <AnchorComponent {...args} />
)

export const Anchor = Template.bind({})
Anchor.args = {
  to: '/?path=/story/navigation-anchor--anchor',
  children: 'Click Anchor',
  className: 'text-primary'
}

export const LinkAnchor = Template.bind({})
LinkAnchor.args = {
  to: '/?path=/story/navigation-anchor--link-anchor',
  children: 'Click Link',
  className: 'text-primary'
}
