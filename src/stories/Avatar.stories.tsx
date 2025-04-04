import type { Meta, StoryObj } from '@storybook/react'
import { Avatar as AvatarComponent } from '../components'

const meta: Meta<typeof AvatarComponent> = {
  title: 'Images/Avatar',
  component: AvatarComponent
}

export default meta
type Story = StoryObj<typeof AvatarComponent>

export const WithImage: Story = {
  args: {
    src: 'https://picsum.photos/50/50',
    width: '50px',
    height: '50px',
    alt: 'Avatar'
  }
}

export const WithoutImage: Story = {
  args: {
    children: 'TB',
    style: {
      backgroundColor: 'red',
      width: '50px',
      height: '50px',
      color: 'white'
    }
  }
}
