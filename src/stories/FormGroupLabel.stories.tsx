import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Checkbox,
  FormControlLabel as FormControlLabelComponent
} from '../components'

const meta: Meta<typeof FormControlLabelComponent> = {
  title: 'Form/FormControl',
  component: FormControlLabelComponent
}

export default meta
type Story = StoryObj<typeof FormControlLabelComponent>

const checkboxArgs = {
  fontSize: '2xl' as const,
  checked: true
}

export const FormControlLabel: Story = {
  args: {
    label: 'Start',
    labelPlacement: 'end',
    control: <Checkbox {...checkboxArgs} />
  }
}
