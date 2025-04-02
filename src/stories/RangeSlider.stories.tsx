import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import RangeSliderComponent from '../components/RangeSlider/RangeSlider'
import Text from '../components/Typography'

const meta: Meta<typeof RangeSliderComponent> = {
  title: 'Form/RangeSlider',
  component: RangeSliderComponent
}

export default meta
type Story = StoryObj<typeof RangeSliderComponent>

export const RangeSlider: Story = {
  args: {
    min: 0,
    max: 1000
  },
  render: (args) => {
    const [text, setText] = useState('')
    const onChange = ({ min, max }) => setText(`${min}km - ${max}km`)

    return (
      <div className="w-80">
        <Text bold className="mb-3">
          {text}
        </Text>
        <RangeSliderComponent
          {...args}
          onChange={onChange}
          className="mt-2 mb-5"
        />
      </div>
    )
  }
}
