import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CellComponent from '../components/Cell/Cell'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

export default {
    title: 'Navigation/Cell',
    component: CellComponent,
    args: {
        children: 'Label placeholder'
    }
} as ComponentMeta<typeof CellComponent>

const Template: ComponentStory<typeof CellComponent> = (args) => <CellComponent {...args} />

export const CellWithIcon = Template.bind({})
CellWithIcon.args = {
    size: 'medium',
    icon: <DynamicHeroIcon icon="MailIcon" />,
    border: true,
    onClick: () => console.log('CLICK')
}

export const Cell = Template.bind({})
Cell.args = {
    size: 'medium',
    onClick: () => console.log('CLICK')
}
