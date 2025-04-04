import React, { useRef, useState } from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import type { Meta, StoryObj } from '@storybook/react'
import {
  FilterSelect as FilterSelectComponent,
  IRadioItems,
  Text
} from '../components'

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

const meta: Meta<typeof FilterSelectComponent> = {
  title: 'Components/FilterSelect',
  component: FilterSelectComponent
}

export default meta
type Story = StoryObj<typeof FilterSelectComponent>

export const FilterSelect: Story = {
  args: {
    title: 'Nombre del filtro',
    listItems: list,
    selectedValue: 'B',
    onApply: handleChange
  },
  render: (args) => {
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
        <FilterSelectComponent {...args} />
      </div>
    )
  }
}
