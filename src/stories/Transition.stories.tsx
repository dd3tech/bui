import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TransitionComponent from '../components/Transition'

const meta: Meta<typeof TransitionComponent> = {
  title: 'Layout/Transition',
  component: TransitionComponent
}

export default meta
type Story = StoryObj<typeof TransitionComponent>

export const Transition: Story = {
  args: {},
  render: ({
    animationStart,
    animationEnd,
    alwaysRender,
    show,
    duration,
    delay,
    fillMode,
    timingFunction
  }) => (
    <TransitionComponent
      show={show}
      duration={duration}
      delay={delay}
      animationStart={animationStart}
      animationEnd={animationEnd}
      fillMode={fillMode}
      timingFunction={timingFunction}
      alwaysRender={alwaysRender}
    >
      <div className="w-24 h-24 bg-red-600 flex items-center justify-center text-white rounded-lg">
        Hey!
      </div>
    </TransitionComponent>
  )
}
