import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Image as ImageComponent } from '../components/Images'

export default {
    title: 'Images/Image'
} as ComponentMeta<typeof ImageComponent>

const Template: ComponentStory<typeof ImageComponent> = (args) => <ImageComponent {...args} />

export const Circle = Template.bind({})
Circle.args = {
    circle: true,
    src: 'https://picsum.photos/200/300?grayscale',
    height: 200,
    width: 200
}

export const Rounded = Template.bind({})
Rounded.args = {
    rounded: 'lg',
    src: 'https://picsum.photos/200/300?grayscale',
    height: 200,
    width: 200
}
