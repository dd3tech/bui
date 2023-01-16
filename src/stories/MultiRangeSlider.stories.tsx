import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import MultiRangeSliderComponent from '../components/MultiRangeSlider/MultiRangeSlider'
import Text from '../components/Typography'

export default {
    title: 'Form/MultiRangeSlider',
    component: MultiRangeSliderComponent
} as ComponentMeta<typeof MultiRangeSliderComponent>

const Template: ComponentStory<typeof MultiRangeSliderComponent> = (args) => {
    const [text, setText] = useState('')
    const onChange = ({ min, max }) => setText(`${min}km - ${max}km`)

    return (
        <div className="w-80">
            <Text bold className="mb-3">
                {text}
            </Text>
            <MultiRangeSliderComponent {...args} onChange={onChange} className="mt-2 mb-5" />
        </div>
    )
}

export const MultiRangeSlider = Template.bind({})

MultiRangeSlider.args = {
    min: 500,
    max: 1000
}
