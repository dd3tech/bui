import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SkeletonComponent from '../components/Skeleton/Skeleton'

export default {
  title: 'Components/Skeletons/Skeleton',
  component: SkeletonComponent
} as ComponentMeta<typeof SkeletonComponent>

const Template: ComponentStory<typeof SkeletonComponent> = (args) => (
  <SkeletonComponent {...args} />
)

export const Skeleton = Template.bind({})
Skeleton.args = {
  animation: 'pulse',
  className: 'bg-gray-300 h-12 w-32 mb-2',
  rounded: 'lg'
}
