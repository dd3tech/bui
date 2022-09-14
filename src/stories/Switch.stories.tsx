import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch as SwitchComponent } from '../components'

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
