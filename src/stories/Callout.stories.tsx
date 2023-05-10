import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CalloutComponent from '../components/Callout'

import { CheckCircleIcon } from '@heroicons/react/solid'

export default {
  title: 'Components/Callout',
  component: CalloutComponent
} as ComponentMeta<typeof CalloutComponent>

const Template: ComponentStory<typeof CalloutComponent> = (args) => (
  <CalloutComponent {...args} />
)

export const Callout = Template.bind({})
Callout.args = {
  title: 'All systems operational',
  description: 'All systems are operational and functioning as expected.',
  icon: CheckCircleIcon
}
