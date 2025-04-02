import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BaseCircleButtonComponent from '../components/Buttons/ShapeButton'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

const meta: Meta<typeof BaseCircleButtonComponent.BaseCircleButton> = {
  title: 'Buttons/BaseCircleButton',
  component: BaseCircleButtonComponent.BaseCircleButton
}

export default meta
type Story = StoryObj<typeof BaseCircleButtonComponent.BaseCircleButton>

export const SquareButton: Story = {
  args: {
    variant: 'square'
  }
}

export const CircleButton: Story = {
  args: {
    variant: 'circle'
  }
}

export const WithCustomIcon: Story = {
  args: {
    variant: 'circle',
    icon: () => (
      <DynamicHeroIcon icon="AcademicCapIcon" className="text-primary w-6" />
    )
  }
}
