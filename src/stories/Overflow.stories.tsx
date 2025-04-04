import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import OverFlowComponent from '../components/Layout/Overflow/Overflow'

const meta: Meta<typeof OverFlowComponent> = {
  title: 'Layout/OverFlow',
  component: OverFlowComponent
}

export default meta
type Story = StoryObj<typeof OverFlowComponent>

const WrappComponent = () => (
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
    Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
    Lorem Ipsum
  </>
)

export const Scroll: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'scroll',
    children: <WrappComponent />
  }
}

export const Auto: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'auto',
    children: <WrappComponent />
  }
}

export const Hidden: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'hidden',
    children: <WrappComponent />
  }
}

export const Visible: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'visible',
    children: <WrappComponent />
  }
}

export const xVisible: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'x-visible',
    children: <WrappComponent />
  }
}

export const xAuto: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'x-auto',
    children: <WrappComponent />
  }
}

export const xHidden: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'x-hidden',
    children: <WrappComponent />
  }
}

export const xScroll: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'x-scroll',
    children: <WrappComponent />
  }
}

export const yHidden: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'y-hidden',
    children: <></>
  }
}

export const yVisible: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'y-visible',
    children: <WrappComponent />
  }
}

export const yScroll: Story = {
  args: {
    className: 'bg-green-200 h-20',
    overflow: 'y-scroll',
    children: <WrappComponent />
  }
}
