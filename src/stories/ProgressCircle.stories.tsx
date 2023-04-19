import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProgressCircleComponent from '../components/ProgressCircle'

export default {
  title: 'Controls/ProgressCircular',
  component: ProgressCircleComponent
} as ComponentMeta<typeof ProgressCircleComponent>

const Template: ComponentStory<typeof ProgressCircleComponent> = (args) => (
  <ProgressCircleComponent {...args} />
)

export const ProgressCircle = Template.bind({})
ProgressCircle.args = {
  value: 30,
  colorComplete: '#34D399',
  colorProgress: 'var(--primary)',
  colorBackground: '#DBEAFE',
  strokeWidth: 11,
  classNamePercentage: 'w-full text-center text-2xl',
  width: 120,
  children: <p className="text-xs">Completado</p>
}
