import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import SnackBar from '../components/SnackBar/SnackBar'
import Button from '../components/Buttons/Button'

const meta: Meta<typeof SnackBar> = {
  title: 'Layout/SnackBar',
  component: SnackBar
}

export default meta
type Story = StoryObj<typeof SnackBar>

export const Snack: Story = {
  args: {
    title: {
      label: 'Title Testing'
    },
    description: 'Description Testing',
    buttonGhost: {
      label: 'Do not show again',
      position: 'right',
      onClick: () => alert('Do not show again')
    }
  },
  render: (args) => {
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
}
