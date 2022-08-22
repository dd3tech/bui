import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Container as ContainerComponent } from './Container'

export default {
    title: 'Design System/Layout/Container'
} as ComponentMeta<typeof ContainerComponent>

const Template: ComponentStory<typeof ContainerComponent> = (args) => <ContainerComponent {...args} />

export const Classic = Template.bind({})
Classic.args = {
    className: 'bg-gray-200 h-20',
    children: (
        <>
            <h2 className="text-center pt-2">This is a Container</h2>
        </>
    )
}

export const Shadow = Template.bind({})
Shadow.args = {
    className: 'h-24',
    shadow: 'lg',
    children: (
        <>
            <h2 className="text-center pt-2">This is a Container Shadow</h2>
        </>
    )
}

export const Rounded = Template.bind({})
Rounded.args = {
    className: 'bg-gray-200 h-24',
    shadow: 'lg',
    rounded: 'lg',
    children: (
        <>
            <h2 className="text-center pt-2">This is a Container Shadow</h2>
        </>
    )
}
