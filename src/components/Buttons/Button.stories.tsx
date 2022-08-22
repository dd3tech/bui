import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
    title: 'Design System/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const BtnPrimary = Template.bind({})
BtnPrimary.args = {
    variant: 'primary',
    children: 'Primary'
}

export const BtnSecondary = Template.bind({})
BtnSecondary.args = {
    variant: 'secondary',
    children: 'Secondary'
}

export const BtnSuccess = Template.bind({})
BtnSuccess.args = {
    variant: 'success',
    children: 'Success'
}

export const BtnError = Template.bind({})
BtnError.args = {
    variant: 'error',
    children: 'Error'
}
