import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Language } from '../../../components/Navbar'

export default {
  title: 'Design System/Langugage',
  component: Language
} as ComponentMeta<typeof Language>

const Template: ComponentStory<typeof Language> = (args) => <Language  {...args} />

export const language = Template.bind({})
language.args = {
  isNavbar: true,
}