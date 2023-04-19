import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Buttons/Button'
import AsideModalComponent from '../components/AsideModal'

export default {
  title: 'Modals/AsideModal',
  component: AsideModalComponent
} as ComponentMeta<typeof AsideModalComponent>

const Template: ComponentStory<typeof AsideModalComponent> = ({
  open: _open,
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
      <AsideModalComponent
        open={open}
        onClose={handleClose}
        title={title}
        children={children}
        {...otherArgs}
      />
    </>
  )
}

export const AsideModal = Template.bind({})
AsideModal.args = {
  children: 'Aside modal children',
  title: 'Aside modal title'
}
