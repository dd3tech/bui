import React, { useState } from 'react'
import { FilterIcon } from '@heroicons/react/outline'
import { useRef } from '@storybook/addons'
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
            <FilterDateComponent {...args} position={position} />
        </div>
    )
}

export const FilterDate = Template.bind({})
FilterDate.args = {
    title: 'Nombre filtro',
    onApply: handleChange,
    width: 300
}
