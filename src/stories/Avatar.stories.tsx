import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Avatar as AvatarComponent } from '../components'

export default {
    title: 'Images/Avatar',
    component: AvatarComponent
} as ComponentMeta<typeof AvatarComponent>

const Template: ComponentStory<typeof AvatarComponent> = (args) => <AvatarComponent {...args} />

export const WithImage = Template.bind({})
WithImage.args = {
    src: 'https://picsum.photos/50/50',
    width: '50px',
    height: '50px',
    alt: 'Avatar'
}

export const WithoutImage = Template.bind({})
WithoutImage.args = {
    children: 'TB',
    style: { backgroundColor: 'red', width: '50px', height: '50px', color: 'white' }
}
