import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text, Button } from '../components'
import ModalCustomComponent from '../components/ModalV2'

export default {
  title: 'Modals/ModalV2',
  component: ModalCustomComponent
} as ComponentMeta<typeof ModalCustomComponent>

const Template: ComponentStory<typeof ModalCustomComponent> = ({
  showModal: _open,
  onClose: _onClose,
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
        showModal={open}
        onClose={handleClose}
        title={title}
        children={children}
        {...otherArgs}
      />
    </>
  )
}

export const ModalV2 = Template.bind({})
ModalV2.args = {
  children: (
    <>
      <div className="flex items-center justify-center h-full">
        <Text>
          Al dar de alta un crédito se contemplará en la estructura de
          financiamiento del proyecto, sin embargo, no se realizará un proceso
          de solicitud de crédito con DD360.
        </Text>
      </div>
    </>
  ),
  height: '500px',
  onSubmit: () => alert('Submit'),
  title: 'Modal title'
}
