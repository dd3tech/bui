import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import BreadcrumbsComponent, { BreadcrumbsProps } from '../components/Breadcrumbs/Breadcrumbs'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

export default {
    title: 'Navigation/Breadcrumbs',
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
        icon: () => <DynamicHeroIcon icon="HomeIcon" width={17} />,
        to: () => alert('Proyectos')
    },
    {
        name: 'Jalapa 200',
        icon: () => <DynamicHeroIcon icon="BeakerIcon" width={17} />,
        to: () => alert('Jalapa 200')
    },
    {
        name: 'Ventas',
        icon: () => <DynamicHeroIcon icon="ChartBarIcon" width={17} />,
        to: () => alert('Ventas')
    }
]

export const Breadcrumbs = Template.bind({})
Breadcrumbs.args = {
    options: optionsWithIcon,
    separator: '>',
    className: 'ml-12'
} as BreadcrumbsProps

export const WhitOutIcon = Template.bind({})
WhitOutIcon.args = {
    options: optionsWithOutIcon,
    separator: '>'
} as BreadcrumbsProps

export const WithIcon = Template.bind({})
WithIcon.args = {
    options: optionsWithIcon as BreadcrumbsProps['options'],
    separator: '>'
} as BreadcrumbsProps
