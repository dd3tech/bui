import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import KbdComponent from '../components/Kbd/Kbd'

export default {
    title: 'Typography/Kbd',
    component: KbdComponent
} as ComponentMeta<typeof KbdComponent>

const Template: ComponentStory<typeof KbdComponent> = (args) => <KbdComponent {...args} />

export const Kbd = Template.bind({})
Kbd.args = {
    kbds: ['Ctrl', 'Shift', 'R'],
    separator: '+'
}
