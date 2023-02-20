import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import ModalCustomComponent from '../components/Modal'

export default {
    title: 'Modals/Modal',
    component: ModalCustomComponent
} as ComponentMeta<typeof ModalCustomComponent>

const Template: ComponentStory<typeof ModalCustomComponent> = (args) => <ModalCustomComponent {...args} />

export const Modal = Template.bind({})
Modal.args = {
    active: true,
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
    setCloseModal: () => {},
    width: '500px'
}
