import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Checkbox as CheckboxComponent,
  FormControlLabel as FormControlLabelComponent
} from '../components'

const meta: Meta<typeof CheckboxComponent> = {
  title: 'Form/Checkbox',
  component: CheckboxComponent
}

export default meta
type Story = StoryObj<typeof CheckboxComponent>

export const Checkbox: Story = {
  args: {
    fontSize: '4xl'
  }
}

type ControlStory = StoryObj<typeof FormControlLabelComponent>

export const CheckBoxWithControl: ControlStory = {
  args: {
    label: 'Example',
    labelPlacement: 'top',
    disabled: true,
    control: <CheckboxComponent fontSize="4xl" />
  }
}
