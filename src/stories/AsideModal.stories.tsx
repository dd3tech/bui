import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Buttons/Button'
import AsideModal from '../components/AsideModal'

export default {
  title: 'Modals/AsideModal',
  component: AsideModal
} as ComponentMeta<typeof AsideModal>

const Template: ComponentStory<typeof AsideModal> = ({
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
      <AsideModal
        open={open}
        onClose={handleClose}
        title={title}
        children={children}
        {...otherArgs}
      />
    </>
  )
}

export const AsideModalTemplate = Template.bind({})
AsideModalTemplate.args = {
  children: 'Aside modal children',
  title: 'Aside modal title'
}
