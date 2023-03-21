import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch as SwitchComponent } from '../components'
import { HomeIcon } from '@heroicons/react/outline'

export default {
  title: 'Controls/Switch',
  component: SwitchComponent
} as ComponentMeta<typeof SwitchComponent>

const Template: ComponentStory<typeof SwitchComponent> = (args) => (
  <SwitchComponent {...args} />
)

const setToggleFn = () => alert('Toggle')

export const Switch = Template.bind({})

Switch.args = {
  toggle: false,
  setToggle: setToggleFn
}

export const WithCustomIcon = Template.bind({})
WithCustomIcon.args = {
  toggle: false,
  setToggle: setToggleFn,
  customIcon: <HomeIcon className="text-gray-400 p-0.5" />
}
