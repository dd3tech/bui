import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { LockClosedIcon, UserAddIcon, UserCircleIcon } from '@heroicons/react/solid'
import { ClipboardCheckIcon } from '@heroicons/react/solid'
import { Collapse } from '../../../components/Navbar'
import { Text, Anchor } from '../../../components/Typography'

export default {
    title: 'Design System/Collapse',
    component: Collapse
} as ComponentMeta<typeof Collapse>

const Template: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />

export const collapseTopBottom = Template.bind({})
collapseTopBottom.args = {
    children: (
        <>
            <div className="border-b-2 p-2">
                <div className="flex items-center pt-2 pl-2">
                    <Text className="text-gray-600 text-xs font-semibold">{'workspace'.toUpperCase()}</Text>
                </div>
                <Anchor to="/project-list" className="mt-4 opacity-none rounded-lg flex gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                    <ClipboardCheckIcon className="text-gray-400" height={20} width={20} /> Mis proyectos
                </Anchor>
                <Anchor to="/developer/new" className="flex opacity-none rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                    <UserAddIcon height={20} width={20} className="text-gray-400" />
                    Agregar desarrollador
                </Anchor>
            </div>
            <div className="border-b-2 p-2">
                <Text className="text-gray-600 text-xs pt-2 pl-2 font-semibold">{'cuenta'.toUpperCase()}</Text>
                <Anchor to="/developer/profile" className="flex opacity-none rounded-lg mt-4 gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                    <UserCircleIcon height={20} width={20} className="text-gray-400" />
                    Mi perfil
                </Anchor>
                <span onClick={() => {}} className="flex rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    <LockClosedIcon className="text-gray-400" height={20} width={20} />
                    Cerrar sesión
                </span>
            </div>
        </>
    )
}

export const collapseTop = Template.bind({})
collapseTop.args = {
    children: (
        <>
            <div className="flex items-center pt-2 pl-2">
                <Text className="text-gray-600 text-xs font-semibold">{'workspace'.toUpperCase()}</Text>
            </div>
            <Anchor to="/project-list" className="mt-4 opacity-none rounded-lg flex gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                <ClipboardCheckIcon className="text-gray-400" height={20} width={20} /> Mis proyectos
            </Anchor>
            <Anchor to="/developer/new" className="flex opacity-none rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                <UserAddIcon height={20} width={20} className="text-gray-400" />
                Agregar desarrollador
            </Anchor>
        </>
    )
}

export const collapseBottom = Template.bind({})
collapseBottom.args = {
    children: (
        <>
            <Text className="text-gray-600 text-xs pt-2 pl-2 font-semibold">{'cuenta'.toUpperCase()}</Text>
            <Anchor to="/developer/profile" className="flex opacity-none rounded-lg mt-4 gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                <UserCircleIcon height={20} width={20} className="text-gray-400" />
                Mi perfil
            </Anchor>
            <span onClick={() => {}} className="flex rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                <LockClosedIcon className="text-gray-400" height={20} width={20} />
                Cerrar sesión
            </span>
        </>
    )
}
