import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ProgressCircleComponent from '../components/ProgressCircle'

const meta: Meta<typeof ProgressCircleComponent> = {
  title: 'Controls/ProgressCircular',
  component: ProgressCircleComponent
}

export default meta
type Story = StoryObj<typeof ProgressCircleComponent>

export const ProgressCircle: Story = {
  args: {
    value: 30,
    colorComplete: '#34D399',
    colorProgress: 'var(--primary)',
    colorBackground: '#DBEAFE',
    strokeWidth: 11,
    classNamePercentage: 'w-full text-center text-2xl',
    width: 120,
    children: <p className="text-xs">Completado</p>
  }
}
