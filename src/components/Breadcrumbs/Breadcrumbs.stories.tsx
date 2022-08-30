import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Breadcrumbs as BreadcrumbsComponent } from '..'

export default {
    title: 'Design System/Breadcrumbs',
    component: BreadcrumbsComponent
} as ComponentMeta<typeof BreadcrumbsComponent>

const Template: ComponentStory<typeof BreadcrumbsComponent> = (args) => <BreadcrumbsComponent {...args} />

const optionsWithOutIcon = [
    {
        name: 'Proyectos',
        to: () => alert('Proyectos')
    },
    {
        name: 'Jalapa 200',
        to: () => alert('Jalapa 200')
    },
    {
        name: 'Ventas',
        to: () => alert('Ventas')
    }
]

const optionsWithIcon = [
    {
        name: 'Proyectos',
        icon: 'HomeIcon',
        to: () => alert('Proyectos')
    },
    {
        name: 'Jalapa 200',
        icon: 'BeakerIcon',
        to: () => alert('Jalapa 200')
    },
    {
        name: 'Ventas',
        icon: 'ChartBarIcon',
        to: () => alert('Ventas')
    }
]

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
    options: optionsWithIcon,
    separator: '>',
    className: 'ml-12'
}

export const WhitOutIcon = Template.bind({})
WhitOutIcon.args = {
    options: optionsWithOutIcon,
    separator: '>'
}

export const WithIcon = Template.bind({})
WithIcon.args = {
    options: optionsWithIcon,
    separator: '>'
}
