import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SnackBar from '../components/SnackBar/SnackBar'
import Button from '../components/Buttons/Button'

export default {
  title: 'Layout/SnackBar',
  component: SnackBar
} as ComponentMeta<typeof SnackBar>

const Template: ComponentStory<typeof SnackBar> = (args) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close SnackBar' : 'Show SnackBar'}
      </Button>
      <SnackBar {...args} show={isOpen} />
    </>
  )
}

export const Snack = Template.bind({})
Snack.args = {
  title: {
    label: 'Title Testing'
  },
  description: 'Description Testing',
  buttonGhost: {
    label: 'Do not show again'
  }
}
