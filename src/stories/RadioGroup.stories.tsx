import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { RadioGroup as RadioGroupComponent, Radio } from '../components'

export default {
  title: 'Buttons/RadioGroup',
  component: RadioGroupComponent
} as ComponentMeta<typeof RadioGroupComponent>

const Template: ComponentStory<typeof RadioGroupComponent> = (args) => {
  const [selectedValue, setSelectedValue] = React.useState('A')

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

export const RadioGroup = Template.bind({})
RadioGroup.args = {
  name: 'radio-buttons-group',
  title: 'Saludar',
  row: false
}
