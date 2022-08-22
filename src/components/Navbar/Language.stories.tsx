import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Language as LanguageComponent } from '.'

export default {
    title: 'Design System/Language',
    component: LanguageComponent
} as ComponentMeta<typeof LanguageComponent>

const Template: ComponentStory<typeof LanguageComponent> = (args) => <LanguageComponent {...args} />

export const Language = Template.bind({})
Language.args = {
    isNavbar: true
}
