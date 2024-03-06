import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import DropdownComponent from '../components/Dropdown'
import { Button } from '../components/Buttons'
import Text from '../components/Typography/Text'

export default {
  title: 'components/Dropdown',
  component: DropdownComponent
} as ComponentMeta<typeof DropdownComponent>

const Template: ComponentStory<typeof DropdownComponent> = ({
  disableAnimation
}) => (
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

export const Dropdown = Template.bind({})
Dropdown.args = {
  disableAnimation: false
}
