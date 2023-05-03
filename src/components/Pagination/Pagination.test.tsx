import { it, describe, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

import Pagination, { PaginationProps } from './Pagination'

const defaultProps: PaginationProps = {
  totalPages: 10,
  totalRows: 30,
  currentPage: 1,
  sliceSize: '5',
  firstText: 'Show',
  secondText: 'of 30 projects',
  goToPreviousPage: vi.fn(),
  goToNextPage: vi.fn(),
  goToPage: vi.fn(),
  setSize: vi.fn()
}

describe('<Pagination/>', () => {
  beforeEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should be render', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('should render with prop firstText', () => {
    const { getByText } = render(<Pagination {...defaultProps} />)
    expect(getByText(defaultProps.firstText as string)).toBeDefined()
  })

  it('should render with a secondText', () => {
    const { getByText } = render(<Pagination {...defaultProps} />)
    expect(getByText(defaultProps.secondText as string)).toBeDefined()
  })

  it('should render with all pages', () => {
    const { getByRole } = render(<Pagination {...defaultProps} />)
    const lastPage = getByRole('last-page').firstChild
    expect(lastPage?.textContent).toBe('10')
  })

  it('should render with a currentPage selected', () => {
    const { getByText } = render(<Pagination {...defaultProps} />)
    expect(getByText('1')?.parentElement?.className).toContain('bg-primary')
  })

  it('should render with three dots', () => {
    const { getAllByText } = render(
      <Pagination {...defaultProps} currentPage={8} totalPages={15} />
    )
    expect(getAllByText('...').length).toBe(2)
  })

  it('select can change the number of elements on the page', () => {
    const { container } = render(<Pagination {...defaultProps} />)
    const select = container.querySelector('select') as Element

    fireEvent.change(select, { target: { value: 10 } })

    expect(defaultProps.setSize).toHaveBeenCalled()
  })

  describe('change page', () => {
    it('change to next page when next button is clicked', () => {
      const { container } = render(<Pagination {...defaultProps} />)
      const nextButton = container.querySelector('ul')?.lastChild
        ?.firstChild as Element

      fireEvent.click(nextButton)

      expect(defaultProps.goToNextPage).toHaveBeenCalled()
    })

    it('change to previous page when next button is clicked', () => {
      const { container } = render(
        <Pagination {...defaultProps} currentPage={2} />
      )
      const previousButton = container.querySelector('ul')?.firstChild
        ?.firstChild as Element

      fireEvent.click(previousButton)

      expect(defaultProps.goToPreviousPage).toHaveBeenCalled()
    })

    it('change to selected page', () => {
      const { getByText } = render(<Pagination {...defaultProps} />)
      const pageButton = getByText('3').parentElement as Element

      fireEvent.click(pageButton)

      expect(defaultProps.goToPage).toHaveBeenCalled()
    })
  })

  describe('disabled buttons pagination', () => {
    it('next page is disabled when current page is on last page', () => {
      const { container } = render(
        <Pagination {...defaultProps} currentPage={10} totalPages={10} />
      )
      const nextButton = container.querySelector('ul')?.lastChild
        ?.firstChild as Element

      expect(nextButton.hasAttribute('disabled')).toBeTruthy()
    })

    it('previous page is disabled when current page is on the first page', () => {
      const { container } = render(<Pagination {...defaultProps} />)
      const firstButton = container.querySelector('ul')?.firstChild
        ?.firstChild as Element

      expect(firstButton.hasAttribute('disabled')).toBeTruthy()
    })

    it('when we click on the first page it should render with the first page', () => {
      const { getByRole } = render(
        <Pagination {...defaultProps} currentPage={6} />
      )
      const firstPage = getByRole('first-page') as HTMLDivElement

      fireEvent.click(firstPage)

      expect(defaultProps.goToPage).toHaveBeenCalledTimes(1)
    })

    it('when we click on the last page it should render with the last page', () => {
      const { getByRole } = render(<Pagination {...defaultProps} />)
      const lastPage = getByRole('last-page') as HTMLDivElement

      fireEvent.click(lastPage)

      expect(defaultProps.goToPage).toHaveBeenCalledTimes(1)
    })
  })

  describe('prop: totalPages', () => {
    it('is equals 0 it shouldnt render anything', () => {
      const { container } = render(
        <Pagination {...defaultProps} totalPages={0} />
      )
      expect(container.firstChild).toBeNull()
    })

    it('is equal to or less than 5 it should render pages without any modifications', () => {
      const { getAllByRole } = render(
        <Pagination {...defaultProps} totalPages={4} />
      )
      const items = getAllByRole('list-page') as HTMLDivElement[]
      expect(items).toHaveLength(4)
    })
  })

  describe('options in the select element', () => {
    it('should have a maximum option value equal to or less than totalRows', () => {
      const { getByRole, getAllByRole } = render(
        <Pagination {...defaultProps} />
      )
      const select = getByRole('select-slice-size') as HTMLSelectElement
      const options = getAllByRole('option') as HTMLOptionElement[]
      fireEvent.change(select, { target: { value: defaultProps.totalRows } })
      const maxOptionValue = Math.max(
        ...options.map((option) => parseInt(option.value, 10))
      )
      expect(select).toBeDefined()
      expect(select.value).toBe(`${defaultProps.totalRows}`)
      expect(maxOptionValue).toEqual(defaultProps.totalRows)
    })
  })
})
