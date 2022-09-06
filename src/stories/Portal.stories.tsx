import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Portal as PortalComponent } from '../common/Portal'

export default {
    title: 'Components/Portal'
} as ComponentMeta<typeof PortalComponent>

const Template: ComponentStory<typeof PortalComponent> = (args) => <PortalComponent {...args} />

export const Portal = Template.bind({})

Portal.args = {
    to: '/portal',
    children: (
        <div className="bg-gray-400 w-full min-h-screen flex justify-center items-center">
            <p className="underline text-2xl font-bold">Hello World from Portal</p>
        </div>
    )
}
