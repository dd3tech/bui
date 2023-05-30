import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import RangeSliderComponent from '../components/RangeSlider/RangeSlider'
import Text from '../components/Typography'

export default {
  title: 'Form/RangeSlider',
  component: RangeSliderComponent
} as ComponentMeta<typeof RangeSliderComponent>

const Template: ComponentStory<typeof RangeSliderComponent> = (args) => {
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

export const RangeSlider = Template.bind({})

RangeSlider.args = {
  min: 0,
  max: 1000
}
