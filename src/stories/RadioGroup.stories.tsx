import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup as RadioGroupComponent, Radio } from '../components'

const meta: Meta<typeof RadioGroupComponent> = {
  title: 'Buttons/RadioGroup',
  component: RadioGroupComponent
}

export default meta
type Story = StoryObj<typeof RadioGroupComponent>

export const RadioGroup: Story = {
  args: {
    name: 'radio-buttons-group',
    title: 'Saludar',
    row: false
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('A')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log('selected value:', event.target.value)
      setSelectedValue(event.target.value)
    }

    return (
      <RadioGroupComponent
        {...args}
        value={selectedValue}
        onChange={handleChange}
      >
        <Radio label="Lorem A" value="A" inputProps={{ 'aria-label': 'A' }} />
        <Radio label="Lorem B" value="B" inputProps={{ 'aria-label': 'B' }} />
        <Radio
          label="Lorem C"
          value="C"
          inputProps={{ 'aria-label': 'C' }}
          color="success"
        />
        <Radio
          label="Lorem D"
          value="D"
          inputProps={{ 'aria-label': 'D' }}
          disabled={true}
        />
      </RadioGroupComponent>
    )
  }
}
