import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  FilterSelect as FilterSelectComponent,
  IRadioItems,
  Text
} from '../components'
import { FilterIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/FilterSelect',
  component: FilterSelectComponent
} as ComponentMeta<typeof FilterSelectComponent>

const list: IRadioItems = {
  A: {
    label: 'Radio button label A'
  },
  B: {
    label: 'Radio button label B'
  },
  C: {
    label: 'Radio button label C',
    disabled: true
  }
}

const handleChange = (value: string) => {
  console.log('handleChange', value)
}

const Template: ComponentStory<typeof FilterSelectComponent> = (args) => {
  return <FilterSelectComponent {...args} />
}

export const FilterSelect = Template.bind({})
FilterSelect.args = {
  title: 'Nombre del filtro',
  listItems: list,
  selectedValue: 'B',
  actionContent: (
    <button className="w-56">
      <div className="flex items-center">
        <Text className="mt-0.5 mr-1" bold>
          FilterSelect
        </Text>
        <FilterIcon className="w-4 h-4" />
      </div>
    </button>
  ),
  onApply: handleChange
}
