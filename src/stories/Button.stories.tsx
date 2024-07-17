import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Buttons/Button'

export default {
  title: 'Buttons/Button',
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const BtnPrimary = Template.bind({})
BtnPrimary.args = {
  variant: 'primary',
  children: 'Primary',
  onClick: () => console.log('CLICK')
}
export const BtnPrimaryLoading = Template.bind({})
BtnPrimaryLoading.args = {
  variant: 'primary',
  children: 'Primary',
  isLoading: true,
  disabled: true,
  onclick: () => console.log('CLICK')
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

export const BtnDanger = Template.bind({})
BtnDanger.args = {
  variant: 'danger',
  children: 'Danger'
}

export const BtnOutlineRed = Template.bind({})
BtnOutlineRed.args = {
  variant: 'outlineWhiteRed',
  children: 'Danger'
}

export const BtnOutlineWhite = Template.bind({})
BtnOutlineWhite.args = {
  variant: 'outlineWhite',
  children: 'Contacto',
  paddingX: 14,
  paddingY: 3,
  className: 'text-base rounded-lg px-'
}

export const BtnAnimation = Template.bind({})
BtnAnimation.args = {
  variant: 'primary',
  children: 'Primary',
  animation: 'pulse',
  onClick: () => console.log('CLICK')
}
