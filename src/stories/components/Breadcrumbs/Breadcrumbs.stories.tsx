import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Breadcrumbs as BreadcrumbsComponent } from '../../../components'

export default {
    title: 'Design System/Breadcrumbs',
    component: BreadcrumbsComponent
} as ComponentMeta<typeof BreadcrumbsComponent>

const Template: ComponentStory<typeof BreadcrumbsComponent> = (args) => <BreadcrumbsComponent {...args} />

const options = [
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

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
    options,
    separator: '>'
}
