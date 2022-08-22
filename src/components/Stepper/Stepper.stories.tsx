import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Stepper as StepperComponent } from '..'

export default {
    title: 'Design System/Stepper',
    component: StepperComponent
} as ComponentMeta<typeof StepperComponent>

const Template: ComponentStory<typeof StepperComponent> = (args) => <StepperComponent {...args} />

export const Stepper = Template.bind({})
Stepper.args = {
    phase: 1,
    totalPhases: 1
}
