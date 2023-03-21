import React, { useRef, useState } from 'react'
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
  const refButton = useRef<null | HTMLButtonElement>(null)
  const [position, setPosition] = useState({ show: false, left: 0, top: 0 })

  const handleClick = () => {
    if (refButton.current !== null) {
      const { offsetLeft, offsetTop } = refButton.current
      setPosition((current) => ({
        ...position,
        show: !current.show,
        left: offsetLeft + 10,
        top: offsetTop + 30
      }))
    }
  }

  return (
    <div className="h-64">
      <button onClick={handleClick} ref={refButton}>
        <div className="flex items-center">
          <Text className="mt-0.5 mr-1" bold>
            FilterSelect
          </Text>
          <FilterIcon className="w-4 h-4" />
        </div>
      </button>
      <FilterSelectComponent {...args} position={position} />
    </div>
  )
}

export const FilterSelect = Template.bind({})
FilterSelect.args = {
  title: 'Nombre del filtro',
  listItems: list,
  selectedValue: 'B',
  onApply: handleChange
}
