import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PaginationComponent from '../components/Pagination'

export default {
    title: 'Navigation/Pagination',
    component: PaginationComponent
} as ComponentMeta<typeof PaginationComponent>

const Template: ComponentStory<typeof PaginationComponent> = (args) => <PaginationComponent {...args} />

export const Pagination = Template.bind({})
Pagination.args = {
    totalPages: 10,
    currentPage: 1,
    sliceSize: '5' as any,
    firstText: 'Show',
    secondText: 'of 30 projects',
    goToPreviousPage: () => {},
    goToNextPage: () => {},
    goToPage: () => {},
    setSize: () => {}
}
