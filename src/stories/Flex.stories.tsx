import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import FlexComponent from '../components/Layout/Flex/Flex'

export default {
  title: 'Layout/Flex',
  component: FlexComponent
} as ComponentMeta<typeof FlexComponent>

const Template: ComponentStory<typeof FlexComponent> = (args) => (
  <FlexComponent {...args} />
)

export const Flex = Template.bind({})
Flex.args = {
  className: 'bg-gray-300 h-20 rounded-md',
  children: (
    <>
      <div className="bg-red-500 text-white w-32 p-2 border rounded-sm">
        1st Element
      </div>
      <div className="bg-blue-700 text-white w-32 p-2 border rounded-sm">
        2nd Element
      </div>
    </>
  )
}
