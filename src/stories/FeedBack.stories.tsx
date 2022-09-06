import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FeedBackBox } from '../components/FeedBackBox'

export default {
    title: 'Components/FeedBackBox'
} as ComponentMeta<typeof FeedBackBox>

const Template: ComponentStory<typeof FeedBackBox> = (args) => <FeedBackBox {...args} />

export const success = Template.bind({})
success.args = {
    type: 'success',
    title: 'Creaste tu cuenta',
    description: 'Revisa tu correo y sigue las instrucciones para iniciar sesión.',
    txtCloseBtn: 'Cerrar'
}

export const error = Template.bind({})
error.args = {
    type: 'error',
    title: 'Error al crear tu cuenta',
    description: 'Lo sentimos, vuelve a intentar enviar el formulario.',
    txtCloseBtn: 'Cerrar'
}
