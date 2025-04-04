import type { Meta, StoryObj } from '@storybook/react'
import SkeletonComponent from '../components/Skeleton/Skeleton'

const meta: Meta<typeof SkeletonComponent> = {
  title: 'Components/Skeletons/Skeleton',
  component: SkeletonComponent
}

export default meta
type Story = StoryObj<typeof SkeletonComponent>

export const Skeleton: Story = {
  args: {
    animation: 'pulse',
    className: 'bg-gray-300 h-12 w-32 mb-2',
    rounded: 'lg'
  }
}
