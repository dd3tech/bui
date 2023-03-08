import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProgressCircularComponent from '../components/ProgressCircular'

export default {
    title: 'Controls/ProgressCircular',
    component: ProgressCircularComponent
} as ComponentMeta<typeof ProgressCircular>

const Template: ComponentStory<typeof ProgressCircularComponent> = (args) => <ProgressCircularComponent {...args} />

export const ProgressCircular = Template.bind({})
ProgressCircular.args = {
    value: 30,
    colorComplete: '#34D399',
    colorProgress: '#1D4ED8',
    colorBackground: '#DBEAFE',
    strokeWidth: 11,
    classNamePercentage: 'w-full text-center text-2xl',
    width: 120,
    children: <p className="text-xs">Completado</p>
}
