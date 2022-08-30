import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text as TextComponent } from '..'

export default {
    title: 'Design System/Typography/Text'
} as ComponentMeta<typeof TextComponent>

const Template: ComponentStory<typeof TextComponent> = (args) => <TextComponent {...args} />

export const h1 = Template.bind({})
h1.args = {
    variant: 'h1',
    children: 'Heading 1',
    align: 'center'
}

export const h2 = Template.bind({})
h2.args = {
    variant: 'h2',
    children: 'Heading 2',
    align: 'left'
}
export const h3 = Template.bind({})
h3.args = {
    variant: 'h3',
    children: 'Heading 3',
    align: 'right'
}
export const h4 = Template.bind({})
h4.args = {
    variant: 'h4',
    children: 'Heading 4',
    align: 'center'
}
export const h5 = Template.bind({})
h5.args = {
    variant: 'h5',
    children: 'Heading 5',
    align: 'justify'
}

export const h6 = Template.bind({})
h6.args = {
    variant: 'h6',
    children: 'Heading 6'
}
export const p = Template.bind({})
p.args = {
    variant: 'p',
    children: 'Parraph'
}

export const span = Template.bind({})
span.args = {
    variant: 'span',
    children: 'Span'
}

export const currency = Template.bind({})
currency.args = {
    variant: 'currency',
    children: '32500'
}
