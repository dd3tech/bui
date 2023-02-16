import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch as SwitchComponent } from '../components'
import { HomeIcon } from '@heroicons/react/outline'

export default {
    title: 'Controls/Switch',
    component: SwitchComponent
} as ComponentMeta<typeof SwitchComponent>

const Template: ComponentStory<typeof SwitchComponent> = (args) => <SwitchComponent {...args} />

export const Switch = Template.bind({})

Switch.args = {
    toggle: false,
    setToggle: () => {}
}

export const WithCustomIcon = Template.bind({})
WithCustomIcon.args = {
    toggle: false,
    setToggle: () => {},
    customIcon: <HomeIcon className="text-gray-400 p-0.5" />
}
