import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FlexComponent from '../components/Layout/Flex/Flex'

export default {
    title: 'Design System/Layout/Flex'
} as ComponentMeta<typeof FlexComponent>

const Template: ComponentStory<typeof FlexComponent> = (args) => <FlexComponent {...args} />

export const Flex = Template.bind({})
Flex.args = {
    className: 'bg-gray-200 h-20',
    children: (
        <>
            <h2 className="text-center pt-2">This is a div flex</h2>
        </>
    )
}
