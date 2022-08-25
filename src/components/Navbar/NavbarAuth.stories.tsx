import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { NavbarAuth as NavbarApp } from '.'
import { LockClosedIcon, UserAddIcon, UserCircleIcon } from '@heroicons/react/solid'
import { ClipboardCheckIcon } from '@heroicons/react/solid'
import { Text, Anchor } from '..'
import { Collapse } from './Collapse'

export default {
    title: 'Design System/NavbarAuth',
    component: NavbarApp
} as ComponentMeta<typeof NavbarApp>

const Template: ComponentStory<typeof NavbarApp> = (args) => <NavbarApp {...args} />

const links = [
    {
        name: 'Projects',
        link: '/projects',
        active: true
    },
    {
        name: 'Credits',
        link: '/projects',
        active: true
    },
    {
        name: 'New',
        link: '/projects',
        active: false
    }
]

const collapse = (
    <Collapse>
        <div className="border-b-2 p-2">
            <div className="flex items-center pt-2 pl-2">
                <Text className="text-gray-600 text-xs font-semibold">{'workspace'.toUpperCase()}</Text>
            </div>
            <Anchor to="/project-list" className="mt-4 opacity-none rounded-lg flex gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                <ClipboardCheckIcon className="text-gray-400" height={20} width={20} /> Mis proyectos
            </Anchor>
            <Anchor to="/developer/new" className="flex opacity-none rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                <UserAddIcon height={20} width={20} className="text-gray-400" />
                Agregar desarollador
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
                Cerra sesion
            </span>
        </div>
    </Collapse>
)

export const navbarLendder = Template.bind({})
navbarLendder.args = {
    isNavbar: true,
    isAuthenticated: true,
    nickname: 'Roberto',
    avatarUrl:
        'https://images.unsplash.com/photo-1656339772807-0faa34c7285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    logo: 'http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png',
    callToAction: () => {},
    callToActionName: 'Nuevo credito',
    logoWidth: 132,
    links,
    Collapse: collapse
}

export const navbardd360 = Template.bind({})
navbardd360.args = {
    isNavbar: true,
    isAuthenticated: true,
    nickname: 'Pedro',
    avatarUrl:
        'https://images.unsplash.com/photo-1656339772807-0faa34c7285f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    logo: 'https://dev.app.dd360.mx/assets/logo.158f6f74.svg',
    callToAction: () => {},
    callToActionName: 'Nuevo credito',
    logoHeight: 18,
    logoWidth: 82,
    links,
    Collapse: collapse
}
