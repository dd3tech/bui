import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BaseCircleButtonComponent from './CircleButtons'
import DynamicHeroIcon from '../../common/DynamicHeroIcon'

export default {
    title: 'Design System/Button',
    component: BaseCircleButtonComponent.BaseCircleButton
} as ComponentMeta<typeof BaseCircleButtonComponent.BaseCircleButton>

const Template: ComponentStory<typeof BaseCircleButtonComponent.BaseCircleButton> = (args) => <BaseCircleButtonComponent.BaseCircleButton {...args} />

export const SquareButton = Template.bind({})
SquareButton.args = { variant: 'square' }
export const CircleButton = Template.bind({})
CircleButton.args = { variant: 'circle' }
export const WithCustomIcon = Template.bind({})
WithCustomIcon.args = { variant: 'circle', Icon: () => <DynamicHeroIcon icon="AcademicCapIcon" className="text-blue-700 w-6" /> }
