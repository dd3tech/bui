import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  FilterSelectMulti as FilterSelectMultiComponent,
  ICheckBoxItems,
  Text
} from '../components'
import { FilterIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/FilterSelectMulti',
  component: FilterSelectMultiComponent
} as ComponentMeta<typeof FilterSelectMultiComponent>

const list: ICheckBoxItems = {
  optional: {
    label: 'Opcional',
    checked: true
  },
  required: {
    label: 'Obligatorio',
    checked: false
  },
  all: {
    label: 'Todos',
    checked: false,
    disabled: true
  },
  'Checkbox label': {
    checked: false
  }
}

const handleChange = (value: string) => {
  console.log('handleChange', value)
}

const Template: ComponentStory<typeof FilterSelectMultiComponent> = (args) => {
  return <FilterSelectMultiComponent {...args} />
}

export const FilterSelectMulti = Template.bind({})
FilterSelectMulti.args = {
  title: 'Nombre del filtro',
  initialItemList: list,
  actionContent: (
    <button>
      <div className="flex items-center">
        <Text className="mt-0.5 mr-1" bold>
          FilterSelectMulti
        </Text>
        <FilterIcon className="w-4 h-4" />
      </div>
    </button>
  ),
  onApply: handleChange,
  usePortal: false
}
