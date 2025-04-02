import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Button from '../components/Buttons/Button'
import AsideModalComponent from '../components/AsideModal'

const meta: Meta<typeof AsideModalComponent> = {
  title: 'Modals/AsideModal',
  component: AsideModalComponent
}

export default meta
type Story = StoryObj<typeof AsideModalComponent>

export const AsideModal: Story = {
  args: {
    children: 'Aside modal children',
    title: 'Aside modal title'
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <AsideModalComponent {...args} open={open} onClose={handleClose} />
      </>
    )
  }
}
