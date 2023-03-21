import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import OverFlowComponent from '../components/Layout/Overflow/Overflow'

export default {
  title: 'Layout/OverFlow',
  component: OverFlowComponent
} as ComponentMeta<typeof OverFlowComponent>

const Template: ComponentStory<typeof OverFlowComponent> = (args) => (
  <OverFlowComponent {...args} />
)

const WrappComponent = () => {
  return (
    <>
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
      Lorem Ipsum
    </>
  )
}

export const Scroll = Template.bind({})
Scroll.args = {
  className: 'bg-green-200 h-20',
  overflow: 'scroll',
  children: <WrappComponent />
}

export const Auto = Template.bind({})
Auto.args = {
  className: 'bg-green-200 h-20',
  overflow: 'auto',
  children: <WrappComponent />
}

export const Hidden = Template.bind({})
Hidden.args = {
  className: 'bg-green-200 h-20',
  overflow: 'hidden',
  children: <WrappComponent />
}

export const Visible = Template.bind({})
Visible.args = {
  className: 'bg-green-200 h-20',
  overflow: 'visible',
  children: <WrappComponent />
}

export const xVisible = Template.bind({})
xVisible.args = {
  className: 'bg-green-200 h-20',
  overflow: 'x-visible',
  children: <WrappComponent />
}

export const xAuto = Template.bind({})
xAuto.args = {
  className: 'bg-green-200 h-20',
  overflow: 'x-auto',
  children: <WrappComponent />
}

export const xHidden = Template.bind({})
xHidden.args = {
  className: 'bg-green-200 h-20',
  overflow: 'x-hidden',
  children: <WrappComponent />
}

export const xScroll = Template.bind({})
xScroll.args = {
  className: 'bg-green-200 h-20',
  overflow: 'x-scroll',
  children: <WrappComponent />
}

export const yHidden = Template.bind({})
yHidden.args = {
  className: 'bg-green-200 h-20',
  overflow: 'y-hidden',
  children: <></>
}

export const yVisible = Template.bind({})
yVisible.args = {
  className: 'bg-green-200 h-20',
  overflow: 'y-visible',
  children: <WrappComponent />
}

export const yScroll = Template.bind({})
yScroll.args = {
  className: 'bg-green-200 h-20',
  overflow: 'y-scroll',
  children: <WrappComponent />
}
