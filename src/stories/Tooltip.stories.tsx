import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TerminalIcon } from '@heroicons/react/outline'
import Button from '../components/Buttons/Button'
import TooltipComponent from '../components/Tooltip'

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent
} as ComponentMeta<typeof TooltipComponent>

const Template: ComponentStory<typeof TooltipComponent> = (args) => (
  <TooltipComponent {...args} />
)

export const Tooltip = Template.bind({})
Tooltip.args = {
  children: <Button>Im a button</Button>,
  startAdornment: <TerminalIcon className="w-4" />,
  content: '@root:'
}
