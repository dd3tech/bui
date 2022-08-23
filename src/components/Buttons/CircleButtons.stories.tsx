import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { BaseCircleButton as BaseCircleButtonComponent } from '.'

export default {
    title: 'Design System/Button',
    component: BaseCircleButtonComponent
} as ComponentMeta<typeof BaseCircleButtonComponent>

const Template: ComponentStory<typeof BaseCircleButtonComponent> = (args) => <BaseCircleButtonComponent {...args} />

export const SquareButton = Template.bind({})
SquareButton.args = { type: 'square' }
export const CircleButton = Template.bind({})
CircleButton.args = { type: 'circle' }
