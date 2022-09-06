import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Navbar } from '../components/Navbar'

export default {
    title: 'Design System/Navbar',
    component: Navbar
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const navbarLendder = Template.bind({})

navbarLendder.args = {
    logoUrl: 'http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png',
    logoWidth: 132,
    logoName: 'Lendd3r Logo'
}

export const navbarDD360 = Template.bind({})

navbarDD360.args = {
    logoUrl: 'https://dev.app.dd360.mx/assets/logo.158f6f74.svg',
    logoWidth: 126,
    logoName: 'DD360 Logo'
}
