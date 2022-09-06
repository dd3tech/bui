import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SideBarComponent from '../components/SideBar/SideBar'

export default {
    title: 'Layout/SideBar',
    component: SideBarComponent
} as ComponentMeta<typeof SideBarComponent>

const Template: ComponentStory<typeof SideBarComponent> = (args) => <SideBarComponent {...args} />

export const SideBar = Template.bind({})
SideBar.args = {
    sideBarList: [
        {
            title: 'Lista 1',
            active: true,
            to: () => console.log('Hola 1')
        },
        {
            title: 'Lista 2',
            active: false,
            to: () => console.log('Hola 2')
        },
        {
            title: 'Lista 3',
            active: false,
            to: () => console.log('Hola 3')
        },
        {
            title: 'Lista 4',
            active: false,
            to: () => console.log('Hola 4')
        }
    ],
    sideBarName: 'Ejemplo SideBar',
    sideBarSubTitle: (
        <p className="text-gray-400 block text-sm">
            Crédito <span className="font-bold">Pre-puente</span>
        </p>
    ),
    dangerZone: { show: true, text: 'Eliminar proyecto' }
}
