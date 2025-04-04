import React, { useRef, useState } from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import type { Meta, StoryObj } from '@storybook/react'
import {
  FilterSelectMulti as FilterSelectMultiComponent,
  ICheckBoxItems,
  Text
} from '../components'

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

const meta: Meta<typeof FilterSelectMultiComponent> = {
  title: 'Components/FilterSelectMulti',
  component: FilterSelectMultiComponent
}

export default meta
type Story = StoryObj<typeof FilterSelectMultiComponent>

export const FilterSelectMulti: Story = {
  args: {
    title: 'Nombre del filtro',
    initialItemList: list,
    onApply: handleChange as any
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
              FilterSelectMulti
            </Text>
            <FilterIcon className="w-4 h-4" />
          </div>
        </button>
        <FilterSelectMultiComponent {...args} />
      </div>
    )
  }
}
