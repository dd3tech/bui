import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Skeleton as SkeletonComponent } from '../../../components/Skeleton'

export default {
    title: 'Design System/Skeleton',
    component: SkeletonComponent
} as ComponentMeta<typeof SkeletonComponent>

const Template: ComponentStory<typeof SkeletonComponent> = (args) => <SkeletonComponent {...args} />

export const Skeleton = Template.bind({})
Skeleton.args = {
    className: 'bg-gray-300 border-b block h-12 gap-12 w-32 mb-2'
}
