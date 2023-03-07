import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text, ToolTipHover as ToolTipHoverComponent } from '../components'

export default {
    title: 'Components/ToolTipHover',
    component: ToolTipHoverComponent
} as ComponentMeta<typeof ToolTipHoverComponent>

const Template: ComponentStory<typeof ToolTipHoverComponent> = (args) => <ToolTipHoverComponent {...args} />

export const ToolTipHover = Template.bind({})

ToolTipHover.args = {
    children: <Text>Hi, I'm tooltip!</Text>,
    variantPopup: 'blue',
    element: <Text className="w-full">Mouse over me</Text>,
    complementPosition: { top: 65, left: 20 }
}
