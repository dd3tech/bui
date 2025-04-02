import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BreadcrumbsComponent from '../components/Breadcrumbs/Breadcrumbs'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

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

const meta: Meta<typeof BreadcrumbsComponent> = {
  title: 'Navigation/Breadcrumbs',
  component: BreadcrumbsComponent
}

export default meta
type Story = StoryObj<typeof BreadcrumbsComponent>

export const Breadcrumbs: Story = {
  args: {
    options: optionsWithIcon,
    separator: '>',
    className: 'ml-12'
  }
}

export const WhitOutIcon: Story = {
  args: {
    options: optionsWithOutIcon,
    separator: '>'
  }
}

export const WithIcon: Story = {
  args: {
    options: optionsWithIcon,
    separator: '>'
  }
}
