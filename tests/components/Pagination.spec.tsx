import React from 'react'
import { it, describe, vi } from 'vitest'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Pagination from '../../src/components/Pagination'

let currentPage = 1

const previousPage = vi.fn()
const nextPage = vi.fn()
const goToPage = vi.fn()
const setSize = vi.fn()

const props = {
    totalPages: 10,
    currentPage: currentPage,
    sliceSize: '5' as any,
    firstText: 'Show',
    secondText: 'of 30 projects',
    goToPreviousPage: previousPage,
    goToNextPage: nextPage,
    goToPage,
    setSize
}

describe('Component UI: Pagination', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Pagination {...props} />)
    })

    it('Pagination, component is working', () => {
        expect(renderResult.getByRole('pagination')).toBeDefined()
    })
    it('Pagination, display first text', () => {
        expect(renderResult.getByText('Show')).toBeDefined()
    })
    it('Pagination, display second text', () => {
        expect(renderResult.getByText('of 30 projects')).toBeDefined()
    })
    it('Pagination, display all pages', () => {
        expect(renderResult.getByRole('last-page').firstChild?.textContent).toBe('10')
    })
    it('Pagination, current page is selected', () => {
        expect(renderResult.getByText('1').parentElement?.className.includes('bg-blue-700')).toBeTruthy()
    })
    it('Pagination, change to next page when next button is clicked', () => {
        const nextButton = renderResult.container.querySelector('ul')?.lastChild?.firstChild as Element

        fireEvent.click(nextButton)

        expect(nextPage).toHaveBeenCalled()
    })
    it('Pagination, change to previous page when next button is clicked', () => {
        renderResult.rerender(<Pagination {...props} currentPage={2} />)
        const previousButton = renderResult.container.querySelector('ul')?.firstChild?.firstChild as Element

        fireEvent.click(previousButton)

        expect(previousPage).toHaveBeenCalled()
    })
    it('Pagination, change to selected page', () => {
        const pageButton = renderResult.getByText('3').parentElement as Element

        fireEvent.click(pageButton)

        expect(goToPage).toHaveBeenCalled()
    })
    it('Pagination, displays three dots when current page is more than 5 and when it is less than the last 5 pages', () => {
        renderResult.rerender(<Pagination {...props} currentPage={8} totalPages={15} />)
        const threeDots = renderResult.getAllByText('...')

        expect(threeDots.length).toBe(2)
    })
    it('Pagination, select can change the number of elements on the page', () => {
        const select = renderResult.container.querySelector('select') as Element

        fireEvent.change(select, { target: { value: 10 } })

        expect(setSize).toHaveBeenCalled()
    })
    it('Pagination, next page is disabled when current page is on last page', () => {
        renderResult.rerender(<Pagination {...props} currentPage={10} totalPages={10} />)
        const nextButton = renderResult.container.querySelector('ul')?.lastChild?.firstChild as Element

        expect(nextButton.hasAttribute('disabled')).toBeTruthy()
    })
    it('Pagination, previous page is disabled when current page is on the first page', () => {
        renderResult.rerender(<Pagination {...props} />)
        const firstButton = renderResult.container.querySelector('ul')?.firstChild?.firstChild as Element

        expect(firstButton.hasAttribute('disabled')).toBeTruthy()
    })
})
