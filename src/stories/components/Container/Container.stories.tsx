import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Container as ContainerComponent } from './Container'
export default {
    title: 'Design System/Layout/Container'
} as ComponentMeta<typeof ContainerComponent>

const Template: ComponentStory<typeof ContainerComponent> = (args) => <ContainerComponent {...args} />

export const Container = Template.bind({})
Container.args = {
    className: 'bg-gray-200 h-20',
    children: (
        <>
            <h2>This is a Container</h2>
        </>
    )
}
