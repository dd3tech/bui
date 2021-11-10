import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Container } from './Layout'
export default {
    title: 'Example/Layout'
} as ComponentMeta<typeof Container>

const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />

export const Primary = Template.bind({})
Primary.args = {
    className: 'bg-gray-200 h-20',
    children: (
        <>
            <h2>This is a Container</h2>
        </>
    )
}

Primary.storyName = 'Container'
