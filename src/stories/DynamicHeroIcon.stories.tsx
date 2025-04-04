import type { Meta, StoryObj } from '@storybook/react'
import { DynamicHeroIcon as DynamicHeroIconComponent } from '../common/DynamicHeroIcon'

const meta: Meta<typeof DynamicHeroIconComponent> = {
  title: 'Components/DynamicHeroIcon',
  component: DynamicHeroIconComponent
}

export default meta
type Story = StoryObj<typeof DynamicHeroIconComponent>

export const DynamicHeroIcon: Story = {
  args: {
    icon: 'CameraIcon',
    className: 'text-info bold',
    width: 30
  }
}
