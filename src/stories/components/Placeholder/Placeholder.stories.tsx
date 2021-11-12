import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PlaceHolder as PlaceHolderComponent } from './PlaceHolder'

export default {
    title: 'Design System/PlaceHolder',
    component: PlaceHolderComponent
} as ComponentMeta<typeof PlaceHolderComponent>

const Template: ComponentStory<typeof PlaceHolderComponent> = (args) => <PlaceHolderComponent {...args} />

export const PlaceHolder = Template.bind({})
PlaceHolder.args = {
    size: 'medium'
}
