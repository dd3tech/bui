import React from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FilterDate as FilterDateComponent, Text } from '../components'

export default {
  title: 'Components/FilterDate',
  component: FilterDateComponent
} as ComponentMeta<typeof FilterDateComponent>

const handleChange = (value: string) => {
  console.log('handleChange', value)
}

const Template: ComponentStory<typeof FilterDateComponent> = (args) => {
  return <FilterDateComponent {...args} />
}

export const FilterDate = Template.bind({})
FilterDate.args = {
  title: 'Nombre filtro',
  onApply: handleChange,
  actionContent: (
    <button className="w-96">
      <div className="flex items-center">
        <Text className="mt-0.5 mr-1" bold>
          FilterDate
        </Text>
        <FilterIcon className="w-4 h-4" />
      </div>
    </button>
  ),
  width: 300
}
