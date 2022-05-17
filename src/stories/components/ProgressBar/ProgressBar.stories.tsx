import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ProgressBar as ProgressBarComponent } from './ProgressBar'

export default {
    title: 'Design System/Progressbar',
    component: ProgressBarComponent
} as ComponentMeta<typeof ProgressBarComponent>

const Template: ComponentStory<typeof ProgressBarComponent> = (args) => <ProgressBarComponent {...args} />

export const ProgressBar = Template.bind({})
ProgressBar.args = {
    value: 30,
    max: 100
}
