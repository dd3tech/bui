import React from 'react'
import { Story, Meta } from '@storybook/react'
import TextComponent, { TextProps } from '../components/Typography/Text'

export default {
    title: 'Typography/Text',
    component: TextComponent
} as Meta<TextProps>

const Template: Story<TextProps> = (args: TextProps) => <TextComponent {...args} />

export const Default = Template.bind({})
Default.args = {
    variant: 'p',
    children: 'Default',
    className: 'text-blue-700',
    align: 'center',
    bold: true,
    textMuted: false,
    textMuted500: false,
    size: 'base'
} as TextProps

export const h1 = Template.bind({})
h1.args = {
    variant: 'h1',
    children: 'Heading 1',
    className: 'text-blue-700',
    align: 'center',
    bold: true,
    textMuted: false,
    textMuted500: false
} as TextProps

export const h2 = Template.bind({})
h2.args = {
    variant: 'h2',
    children: 'Heading 2',
    align: 'left',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const h3 = Template.bind({})
h3.args = {
    variant: 'h3',
    children: 'Heading 3',
    align: 'right',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const h4 = Template.bind({})
h4.args = {
    variant: 'h4',
    children: 'Heading 4',
    align: 'center',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const h5 = Template.bind({})
h5.args = {
    variant: 'h5',
    children: 'Heading 5',
    align: 'justify',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const h6 = Template.bind({})
h6.args = {
    variant: 'h6',
    children: 'Heading 6',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const p = Template.bind({})
p.args = {
    variant: 'p',
    children: 'Parraph',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const span = Template.bind({})
span.args = {
    variant: 'span',
    children: 'Span',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const currency = Template.bind({})
currency.args = {
    variant: 'currency',
    children: '32500',
    bold: false,
    textMuted: false,
    textMuted500: false
} as TextProps

export const responsive = Template.bind({})
responsive.args = {
    children: 'Responsive',
    size: { sm: 'xs', md: '2xl', lg: '6xl', xl: '9xl', '2xl': 'sm' }
} as TextProps
