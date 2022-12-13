import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProgressBarComponent from '../components/ProgressBar'

export default {
    title: 'Controls/Progressbar',
    component: ProgressBarComponent
} as ComponentMeta<typeof ProgressBarComponent>

const Template: ComponentStory<typeof ProgressBarComponent> = (args) => <ProgressBarComponent {...args} />

export const ProgressBar = Template.bind({})
ProgressBar.args = {
    value: 30,
    max: 100
}
