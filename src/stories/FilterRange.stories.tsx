import React, { useRef, useState } from 'react'
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
                        FilterRange
                    </Text>
                    <FilterIcon className="w-4 h-4" />
                </div>
            </button>
            <FilterRangeComponent {...args} position={position} />
        </div>
    )
}

export const FilterRange = Template.bind({})
FilterRange.args = {
    title: 'Nombre del filtro',
    min: 30,
    max: 300,
    onApply: handleChange
}
