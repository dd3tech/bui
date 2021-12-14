import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Badge as BadgeComponent } from './Badge'

export default {
    title: 'Design System/Badge',
    component: BadgeComponent
} as ComponentMeta<typeof BadgeComponent>

const Template: ComponentStory<typeof BadgeComponent> = (args) => <BadgeComponent {...args} />

export const Badge = Template.bind({})
Badge.args = {
    children: 'Primary',
    variant: 'primary'
}

export const BadgeButton = Template.bind({})
BadgeButton.args = {
    children: 'Primary',
    variant: 'primary',
    btn: true,
    onClick: () => alert('Badge Button')
}
