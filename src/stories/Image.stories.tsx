import type { Meta, StoryObj } from '@storybook/react'
import ImageComponent from '../components/Image'

const meta: Meta<typeof ImageComponent> = {
  title: 'Images/Image',
  component: ImageComponent
}

export default meta
type Story = StoryObj<typeof ImageComponent>

export const Circle: Story = {
  args: {
    circle: true,
    src: 'https://picsum.photos/200/300?grayscale',
    height: 200,
    width: 200
  }
}

export const Rounded: Story = {
  args: {
    rounded: 'lg',
    src: 'https://picsum.photos/200/300?grayscale',
    height: 200,
    width: 200
  }
}
