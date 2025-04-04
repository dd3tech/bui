import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/Buttons/Button'
import ButtonGroupComponent from '../components/Buttons/ButtonGroup'

const meta: Meta<typeof ButtonGroupComponent> = {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroupComponent
}

export default meta
type Story = StoryObj<typeof ButtonGroupComponent>

export const ButtonGroup: Story = {
  args: {
    orientation: 'horizontal',
    gap: 6
  },
  render: (args) => (
    <ButtonGroupComponent {...args}>
      <Button variant="primary" className="w-32">
        1st button
      </Button>
      <Button variant="secondary" className="w-32">
        2nd button
      </Button>
      <Button variant="success" className="w-32">
        3rd button
      </Button>
    </ButtonGroupComponent>
  )
}
