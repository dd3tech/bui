import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Progress as ProgressComponent } from '../components/Progress'

export default {
  title: 'components/Progress',
  component: ProgressComponent
} as ComponentMeta<typeof ProgressComponent>

const Template: ComponentStory<typeof ProgressComponent> = ({
  type,
  value,
  width,
  height,
  circleSize,
  lineWidth,
  indeterminate,
  progressLineColor,
  backgroundLineColor,
  lineCap,
  children
}) => (
  <ProgressComponent
    type={type}
    value={value}
    width={width}
    height={height}
    circleSize={circleSize}
    lineWidth={lineWidth}
    indeterminate={indeterminate}
    progressLineColor={progressLineColor}
    backgroundLineColor={backgroundLineColor}
    lineCap={lineCap}
  >
    {children}
  </ProgressComponent>
)

export const Progress = Template.bind({})
Progress.args = {
  type: 'circle',
  value: 25,
  width: 300,
  height: 6,
  circleSize: 100,
  lineWidth: 10,
  indeterminate: false,
  progressLineColor: '#1d4ed8',
  backgroundLineColor: '#e5e7eb'
}
