import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Button from '../components/Buttons/Button'
import ModalCustomComponent from '../components/Modal'

const meta: Meta<typeof ModalCustomComponent> = {
  title: 'Modals/Modal',
  component: ModalCustomComponent
}

export default meta
type Story = StoryObj<typeof ModalCustomComponent>

export const Modal: Story = {
  args: {
    blur: false,
    children: (
      <div className="flex items-center justify-center h-full">
        <div className="pt-10 pl-14 pr-14">Hola este es el ModalCustom</div>
      </div>
    ),
    fullScreen: false,
    height: '500px',
    preventClose: false,
    setCloseModal: () => alert('Show modal'),
    width: '500px'
  },
  render: ({ title, children, ...args }) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <ModalCustomComponent
          {...args}
          active={open}
          setCloseModal={handleClose}
          title={title}
        >
          {children}
        </ModalCustomComponent>
      </>
    )
  }
}
