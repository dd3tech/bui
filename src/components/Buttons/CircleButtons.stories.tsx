import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { CircleButton as BaseCircleButtonComponent } from '.'

export default {
    title: 'Design System/Button',
    component: BaseCircleButtonComponent.BaseCircleButton
} as ComponentMeta<typeof BaseCircleButtonComponent.BaseCircleButton>

const Template: ComponentStory<typeof BaseCircleButtonComponent.BaseCircleButton> = (args) => <BaseCircleButtonComponent.BaseCircleButton {...args} />

export const SquareButton = Template.bind({})
SquareButton.args = { variant: 'square' }
export const CircleButton = Template.bind({})
CircleButton.args = { variant: 'circle' }
