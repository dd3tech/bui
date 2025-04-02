import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Portal as PortalComponent } from '../common/Portal'

const meta: Meta<typeof PortalComponent> = {
  title: 'Components/Portal',
  component: PortalComponent
}

export default meta
type Story = StoryObj<typeof PortalComponent>

export const Portal: Story = {
  args: {
    children: (
      <div className="bg-gray-400 w-full min-h-screen flex justify-center items-center">
        <p className="underline text-2xl font-bold">Hello World from Portal</p>
      </div>
    )
  }
}
