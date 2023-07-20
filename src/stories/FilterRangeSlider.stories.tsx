import React from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  FilterRangeSlider as FilterRangeSliderComponent,
  IRangeSlider,
  Text
} from '../components'

export default {
  title: 'Components/FilterRangeSlider',
  component: FilterRangeSliderComponent
} as ComponentMeta<typeof FilterRangeSliderComponent>

const Template: ComponentStory<typeof FilterRangeSliderComponent> = (args) => {
  return <FilterRangeSliderComponent {...args} />
}

export const FilterRangeSlider = Template.bind({})
FilterRangeSlider.args = {
  title: 'Nombre del filtro',
  min: 50,
  max: 150,
  width: 188,
  actionContent: (
    <button className="w-52">
      <div className="flex items-center">
        <Text className="mt-0.5 mr-1" bold>
          FilterRangeSlider
        </Text>
        <FilterIcon className="w-4 h-4" />
      </div>
    </button>
  ),
  onApply: (range: IRangeSlider) => console.log(range)
}
