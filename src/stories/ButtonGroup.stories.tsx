import React from 'react'
import { Story, Meta } from '@storybook/react'
import Button from '../components/Buttons/Button'
import ButtonGroupComponent, {
  ButtonGroupProps
} from '../components/Buttons/ButtonGroup'

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroupComponent
} as Meta<ButtonGroupProps>

const Template: Story<ButtonGroupProps> = (args: ButtonGroupProps) => {
  return (
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

export const ButtonGroup = Template.bind({})
ButtonGroup.args = {
  orientation: 'horizontal',
  gap: 6
}
