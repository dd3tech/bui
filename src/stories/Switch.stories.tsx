import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Switch as SwitchComponent } from '../components'
import { HomeIcon } from '@heroicons/react/outline'

const meta: Meta<typeof SwitchComponent> = {
  title: 'Controls/Switch',
  component: SwitchComponent
}

export default meta
type Story = StoryObj<typeof SwitchComponent>

const setToggleFn = () => alert('Toggle')

export const Switch: Story = {
  args: {
    toggle: false,
    setToggle: setToggleFn
  }
}

export const WithCustomIcon: Story = {
  args: {
    toggle: false,
    setToggle: setToggleFn,
    customIcon: <HomeIcon className="text-gray-400 p-0.5" />
  }
}
