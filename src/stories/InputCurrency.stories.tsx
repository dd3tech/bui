import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import InputCurrency from '../components/Form/InputCurrency'

const meta: Meta<typeof InputCurrency> = {
  title: 'Form/InputCurrency',
  component: InputCurrency
}

export default meta
type Story = StoryObj<typeof InputCurrency>

export const Default: Story = {
  args: {
    onBlurInput: () => console.log('ON BLUR 123')
  },
  render: (args) => {
    const [value, setValue] = useState<string | undefined>()

    return (
      <InputCurrency
        prefix="$"
        value={value}
        defaultValue={0}
        decimalScale={2}
        decimalsLimit={0}
        onChange={(value) => setValue(value)}
        {...args}
      />
    )
  }
}
