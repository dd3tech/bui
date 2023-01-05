import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import DividerComponent from '../components/Divider'

export default {
    title: 'Layout/Divider',
    component: DividerComponent
} as ComponentMeta<typeof DividerComponent>

const Template: ComponentStory<typeof DividerComponent> = (args) => {
    return (
        <div className={`flex w-max min-h-full border border-gray-200 rounded ${args.vertical ? '' : 'flex-col'}`}>
            <span className="m-3">Element 1</span>
            <DividerComponent {...args} />
            <span className="m-3">Element 2</span>
        </div>
    )
}

export const Divider = Template.bind({})
Divider.args = {
    variant: 'middle',
    size: 'small',
    light: true,
    vertical: false
}

export const DividerFull = Template.bind({})
DividerFull.args = {
    variant: 'full',
    size: 'small',
    light: true,
    vertical: true
}
