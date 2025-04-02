import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TerminalIcon } from '@heroicons/react/outline'
import Button from '../components/Buttons/Button'
import TooltipComponent from '../components/Tooltip'

const meta: Meta<typeof TooltipComponent> = {
  title: 'Components/Tooltip',
  component: TooltipComponent
}

export default meta
type Story = StoryObj<typeof TooltipComponent>

export const Tooltip: Story = {
  args: {
    children: <Button>Im a button</Button>,
    startAdornment: <TerminalIcon className="w-4" />,
    content: '@root:'
  }
}
