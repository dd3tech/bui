import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
    title: 'Design System/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    primary: true,
    children: 'Primary'
}

export const Secondary = Template.bind({})
Secondary.args = {
    children: 'Secondary'
}

export const Large = Template.bind({})
Large.args = {
    size: 'large',
    children: 'Large'
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
    children: 'Small'
}
