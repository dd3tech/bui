import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PaginationComponent from '../components/Pagination'

export default {
  title: 'Navigation/Pagination',
  component: PaginationComponent
} as ComponentMeta<typeof PaginationComponent>

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
  <PaginationComponent {...args} />
)

const mockFn = (text: string) => alert(text)

export const Pagination = Template.bind({})
Pagination.args = {
  totalRows: 30,
  totalPages: 10,
  currentPage: 1,
  sliceSize: '5' as any,
  firstText: 'Show',
  secondText: 'of 30 projects',
  goToPreviousPage: () => mockFn('Go to previous page'),
  goToNextPage: () => mockFn('Go to next page'),
  goToPage: () => mockFn('Go to x page'),
  setSize: () => mockFn('Set size of table')
}
