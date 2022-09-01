import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import KbdComponent from './Kbd'

export default {
    title: 'Design System/Kbd'
} as ComponentMeta<typeof KbdComponent>

const Template: ComponentStory<typeof KbdComponent> = (args) => <KbdComponent {...args} />

export const Kbd = Template.bind({})
Kbd.args = {
    kbds: ['Ctrl', 'Shift', 'R'],
    separator: '+'
}
