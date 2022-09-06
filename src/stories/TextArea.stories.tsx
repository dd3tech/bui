import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { TextArea as TextAreaComponent } from '../components/Form'

export default {
    title: 'Form/TextArea'
} as ComponentMeta<typeof TextAreaComponent>

const Template: ComponentStory<typeof TextAreaComponent> = (args) => <TextAreaComponent {...args} />

export const TextArea = Template.bind({})
TextArea.args = {
    label: 'Text area'
}
