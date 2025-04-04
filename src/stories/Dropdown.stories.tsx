import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import DropdownComponent from '../components/Dropdown'
import { Button } from '../components/Buttons'
import Text from '../components/Typography/Text'

const meta: Meta<typeof DropdownComponent> = {
  title: 'components/Dropdown',
  component: DropdownComponent
}

export default meta
type Story = StoryObj<typeof DropdownComponent>

export const Dropdown: Story = {
  args: {
    disableAnimation: false
  },
  render: ({ disableAnimation }) => (
    <div className="flex justify-center">
      <DropdownComponent disableAnimation={disableAnimation}>
        <DropdownComponent.Trigger>
          <Button className="h-10 pt-2 pb-3" paddingX="3">
            <Text size="xs" bold className="text-white">
              Trigger
            </Text>
          </Button>
        </DropdownComponent.Trigger>
        <DropdownComponent.Menu>
          <Text className="px-5" size="base" bold>
            Content
          </Text>
        </DropdownComponent.Menu>
      </DropdownComponent>
    </div>
  )
}
