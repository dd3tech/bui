import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import Button from '../components/Buttons/Button'
import ModalCustomComponent from '../components/Modal'

export default {
  title: 'Modals/Modal',
  component: ModalCustomComponent
} as ComponentMeta<typeof ModalCustomComponent>

const Template: ComponentStory<typeof ModalCustomComponent> = ({
  active: _open,
  setCloseModal: _onClose,
  title,
  children,
  ...otherArgs
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button onClick={handleOpen}>Open Modal</Button>
      <ModalCustomComponent
        active={open}
        setCloseModal={handleClose}
        title={title}
        children={children}
        {...otherArgs}
      />
    </>
  )
}

export const Modal = Template.bind({})
Modal.args = {
  blur: false,
  children: (
    <>
      <div className="flex items-center justify-center h-full">
        <div className="pt-10 pl-14 pr-14">Hola este es el ModalCustom</div>
      </div>
    </>
  ),
  fullScreen: false,
  height: '500px',
  preventClose: false,
  setCloseModal: () => alert('Show modal'),
  width: '500px'
}
