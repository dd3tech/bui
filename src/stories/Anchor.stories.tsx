import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Anchor as AnchorComponent } from '../components/Navigation'

export default {
  title: 'Navigation/Anchor',
  component: AnchorComponent
} as ComponentMeta<typeof AnchorComponent>

const Template: ComponentStory<typeof AnchorComponent> = (args) => (
  <AnchorComponent {...args} />
)

export const Anchor = Template.bind({})
Anchor.args = {
  to: '/anchor',
  children: 'Click Anchor',
  className: 'text-blue-700'
}

export const LinkAnchor = Template.bind({})
LinkAnchor.args = {
  to: '/link',
  children: 'Click Link',
  className: 'text-blue-700'
}
