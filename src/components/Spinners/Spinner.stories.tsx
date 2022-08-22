import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Spinner as SpinnerComponent } from '.'

export default {
    title: 'Design System/Spinner'
} as ComponentMeta<typeof SpinnerComponent>

const Template: ComponentStory<typeof SpinnerComponent> = (args) => <SpinnerComponent {...args} />

export const Grow = Template.bind({})

Grow.args = {
    type: 'grow',
    color: '#f51'
}

export const Circle = Template.bind({})

Circle.args = {
    type: 'circle',
    color: '#f51'
}

export const Red = Template.bind({})

Red.args = {
    variant: 'red'
}

export const Blue = Template.bind({})

Blue.args = {
    variant: 'blue'
}
export const Yellow = Template.bind({})

Yellow.args = {
    variant: 'yellow'
}
export const Green = Template.bind({})

Green.args = {
    variant: 'green'
}

export const Custom = Template.bind({})

Custom.args = {
    color: '#f51'
}

export const PageLoader = Template.bind({})
PageLoader.args = {
    pageLoader: true
}
