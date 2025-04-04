import type { Meta, StoryObj } from '@storybook/react'
import WrapperComponent from '../components/Wrapper'

const meta: Meta<typeof WrapperComponent> = {
  title: 'Layout/Wrapper',
  component: WrapperComponent
}

export default meta
type Story = StoryObj<typeof WrapperComponent>

export const lg: Story = {
  args: {
    maxWidth: 'screen-lg',
    className: 'bg-blue-200',
    children: 'Hello World LG'
  }
}

export const xl: Story = {
  args: {
    maxWidth: 'screen-xl',
    className: 'bg-pink-200',
    children: 'Hello World XL'
  }
}

export const xl2: Story = {
  args: {
    maxWidth: 'screen-2xl',
    className: 'bg-green-200',
    children: 'Hello World 2XL'
  }
}

export const full: Story = {
  args: {
    maxWidth: 'full',
    className: 'bg-gray-200',
    children: 'Hello World FULL'
  }
}
