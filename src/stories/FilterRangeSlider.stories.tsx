import { FilterIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useRef, useState } from 'react'
import { FilterRangeSlider as FilterRangeSliderComponent, IRangeSlider, Text } from '../components'

export default {
    title: 'Components/FilterRangeSlider',
    component: FilterRangeSliderComponent
} as ComponentMeta<typeof FilterRangeSliderComponent>

const Template: ComponentStory<typeof FilterRangeSliderComponent> = (args) => {
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
                        FilterRangeSlider
                    </Text>
                    <FilterIcon className="w-4 h-4" />
                </div>
            </button>
            <FilterRangeSliderComponent {...args} position={position} />
        </div>
    )
}

export const FilterRangeSlider = Template.bind({})
FilterRangeSlider.args = {
    title: 'Nombre del filtro',
    min: 50,
    max: 150,
    width: 188,
    onApply: (range: IRangeSlider) => console.log(range)
}
