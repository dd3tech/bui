import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import CellComponent from '../components/Cell/Cell'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

const meta: Meta<typeof CellComponent> = {
  title: 'Navigation/Cell',
  component: CellComponent,
  args: {
    children: 'Label placeholder'
  }
}

export default meta
type Story = StoryObj<typeof CellComponent>

export const CellWithIcon: Story = {
  args: {
    size: 'medium',
    icon: <DynamicHeroIcon icon="MailIcon" />,
    border: true,
    onClick: () => console.log('CLICK')
  }
}

export const Cell: Story = {
  args: {
    size: 'medium',
    onClick: () => console.log('CLICK')
  }
}
