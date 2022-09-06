import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'
import Order, { OrderProps } from '../components/Layout/Order/Order'

export default {
    title: 'Layout/Order'
} as ComponentMeta<typeof Order>

const Template: Story<OrderProps> = (args: OrderProps) => {
    return (
        <div className="flex justify-between bg-gray-200">
            <Order {...args} />
            <Order order="1">Order 1</Order>
            <Order order="2">Order 2</Order>
        </div>
    )
}

export const Default = Template.bind({})
Default.args = {
    order: 'last',
    children: 'My custom order component'
}
