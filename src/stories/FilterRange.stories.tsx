import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilterRange as FilterRangeComponent, Text } from '../components'
import { FilterIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/FilterRange',
  component: FilterRangeComponent
} as ComponentMeta<typeof FilterRangeComponent>

const handleChange = (value: string) => {
  console.log('handleChange', value)
}

const Template: ComponentStory<typeof FilterRangeComponent> = (args) => {
  return <FilterRangeComponent {...args} />
}

export const FilterRange = Template.bind({})
FilterRange.args = {
  title: 'Nombre del filtro',
  min: 30,
  max: 300,
  actionContent: (
    <button className="w-56">
      <div className="flex items-center">
        <Text className="mt-0.5 mr-1" bold>
          FilterRange
        </Text>
        <FilterIcon className="w-4 h-4" />
      </div>
    </button>
  ),
  onApply: handleChange
}
