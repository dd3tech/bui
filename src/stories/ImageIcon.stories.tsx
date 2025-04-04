import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ImageIconComponent from '../components/ImageIcon'

const meta: Meta<typeof ImageIconComponent> = {
  title: 'Images/imageIcon',
  component: ImageIconComponent
}

export default meta
type Story = StoryObj<typeof ImageIconComponent>

export const Example: Story = {
  render: () => (
    <div className="flex">
      <div className="mr-5">
        <h2>Image Icon</h2>
        <ImageIconComponent src="https://picsum.photos/200/300?grayscale" />
      </div>
      <div className="mr-5">
        <h2>Button Image Icon</h2>
        <ImageIconComponent
          src="https://picsum.photos/200/300?grayscale"
          button
          buttonOnClick={() => alert('Button')}
        />
      </div>
    </div>
  )
}

export const ImageIcon: Story = {
  args: {
    src: 'https://picsum.photos/200/300?grayscale'
  }
}

export const ButtonImageIcon: Story = {
  args: {
    src: 'https://picsum.photos/200/300?grayscale',
    button: true,
    buttonOnClick: () => alert('Button')
  }
}
