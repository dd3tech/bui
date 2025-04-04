import type { Meta, StoryObj } from '@storybook/react'
import FeedBackBox from '../components/FeedBackBox'

const meta: Meta<typeof FeedBackBox> = {
  title: 'Components/FeedBackBox',
  component: FeedBackBox
}

export default meta
type Story = StoryObj<typeof FeedBackBox>

export const success: Story = {
  args: {
    type: 'success',
    title: 'Creaste tu cuenta',
    description:
      'Revisa tu correo y sigue las instrucciones para iniciar sesión.',
    txtCloseBtn: 'Cerrar'
  }
}

export const error: Story = {
  args: {
    type: 'error',
    title: 'Error al crear tu cuenta',
    description: 'Lo sentimos, vuelve a intentar enviar el formulario.',
    txtCloseBtn: 'Cerrar'
  }
}
