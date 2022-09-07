import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Wrapper as WrapperComponent } from '../components/Wrapper'

export default {
    title: 'Layout/Wrapper',
    component: WrapperComponent
} as ComponentMeta<typeof WrapperComponent>

const Template: ComponentStory<typeof WrapperComponent> = (args) => <WrapperComponent {...args} />

export const lg = Template.bind({})
lg.args = {
    maxWidth: 'screen-lg',
    className: 'bg-blue-200',
    children: 'Hello World LG'
}

export const xl = Template.bind({})
xl.args = {
    maxWidth: 'screen-xl',
    className: 'bg-pink-200',
    children: 'Hello World XL'
}

export const xl2 = Template.bind({})
xl2.args = {
    maxWidth: 'screen-2xl',
    className: 'bg-green-200',
    children: 'Hello World 2XL'
}

export const full = Template.bind({})
full.args = {
    maxWidth: 'full',
    className: 'bg-gray-200',
    children: 'Hello World FULL'
}
