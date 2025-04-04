import type { Meta, StoryObj } from '@storybook/react'
import PaginationComponent from '../components/Pagination'

const meta: Meta<typeof PaginationComponent> = {
  title: 'Navigation/Pagination',
  component: PaginationComponent
}

export default meta
type Story = StoryObj<typeof PaginationComponent>

const mockFn = (text: string) => alert(text)

export const Pagination: Story = {
  args: {
    totalRows: 120,
    totalPages: 10,
    currentPage: 1,
    sliceSize: '5' as any,
    firstText: 'Show',
    secondText: 'of 120 projects',
    goToPreviousPage: () => mockFn('Go to previous page'),
    goToNextPage: () => mockFn('Go to next page'),
    goToPage: () => mockFn('Go to x page'),
    setSize: () => mockFn('Set size of table')
  }
}
