import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import TransitionComponent from '../components/Layout/Transition'

export default {
  title: 'Layout/Transition',
  component: TransitionComponent
} as ComponentMeta<typeof TransitionComponent>

const Template: ComponentStory<typeof TransitionComponent> = ({
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

export const Transition = Template.bind({})
Transition.args = {}
