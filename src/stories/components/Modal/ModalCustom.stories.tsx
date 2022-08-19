import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ModalCustom as ModalCustomComponent } from '../../../components'

export default {
    title: 'Design System/Modal/ModalCustom',
    component: ModalCustomComponent
} as ComponentMeta<typeof ModalCustomComponent>

const Template: ComponentStory<typeof ModalCustomComponent> = (args) => <ModalCustomComponent {...args} />

export const ModalCustom = Template.bind({})
ModalCustom.args = {
    children: (
        <>
            <div className="flex items-center justify-center h-full">
                <div className="pt-10 pl-14 pr-14">Hola este es el ModalCustom</div>
            </div>
        </>
    ),
    active: true,
    width: '500px',
    height: '500px'
}
