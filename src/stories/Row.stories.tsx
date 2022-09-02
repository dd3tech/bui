import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Row as RowComponent } from '../components/Layout/Grid/Row'

export default {
    title: 'Design System/Layout/Row'
} as ComponentMeta<typeof RowComponent>

const Template: ComponentStory<typeof RowComponent> = (args) => <RowComponent {...args} />

export const Row = Template.bind({})
Row.args = {
    cols: 1,
    md: 2,
    gap: 5,
    children: (
        <>
            <div className="bg-gray-300 text-center h-24">
                <h2>1st Col</h2>
            </div>
            <div className="bg-blue-300 text-center h-24">
                <h2>2nd Col</h2>
            </div>
        </>
    )
}
