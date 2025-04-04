import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Text, ToolTipHover as ToolTipHoverComponent } from '../components'

const meta: Meta<typeof ToolTipHoverComponent> = {
  title: 'Components/ToolTipHover',
  component: ToolTipHoverComponent
}

export default meta
type Story = StoryObj<typeof ToolTipHoverComponent>

export const ToolTipHover: Story = {
  args: {
    children: <Text>Hi, Im tooltip!</Text>,
    variantPopup: 'blue',
    element: <Text className="w-full">Mouse over me</Text>,
    complementPosition: { top: 65, left: 20 }
  }
}
