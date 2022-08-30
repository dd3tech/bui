import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Spinner as SpinnerComponent } from '.'

export default {
    title: 'Design System/Spinner'
} as ComponentMeta<typeof SpinnerComponent>

const Template: ComponentStory<typeof SpinnerComponent> = (args) => <SpinnerComponent {...args} />

export const Spinner = Template.bind({})
Spinner.args = {
    color: '#f51',
    width: '4rem',
    height: '4rem',
    border: 5
}

export const PageLoader = Template.bind({})
PageLoader.args = {
    pageLoader: true
}
