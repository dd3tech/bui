import React, { useRef, useState } from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterDate as FilterDateComponent, Text } from '../components'

const handleChange = (value: string) => {
  console.log('handleChange', value)
}

const meta: Meta<typeof FilterDateComponent> = {
  title: 'Components/FilterDate',
  component: FilterDateComponent
}

export default meta
type Story = StoryObj<typeof FilterDateComponent>

export const FilterDate: Story = {
  args: {
    title: 'Nombre filtro',
    onApply: handleChange as any,
    width: 300
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
              FilterDate
            </Text>
            <FilterIcon className="w-4 h-4" />
          </div>
        </button>
        <FilterDateComponent {...args} />
      </div>
    )
  }
}
