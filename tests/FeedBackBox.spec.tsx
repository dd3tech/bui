import React from 'react'
import { it, describe, vi } from 'vitest'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { FeedBackBox } from '../src/components'

describe('Component UI: FeedBackBox', () => {
    const onClose = vi.fn()
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(
            <FeedBackBox title="Awesome title" type="success" description="This is a description" txtCloseBtn="Close button" onClose={onClose} />
        )
    })
    it('FeedBackBox component is working', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })
    it('FeedBackBox component display texts', () => {
        expect(renderResult.getByText('Awesome title.')).toBeDefined()
        expect(renderResult.getByText('This is a description.')).toBeDefined()
        expect(renderResult.getByText('Close button')).toBeDefined()
    })
    it('FeedBackBox component render CheckCircleIcon svg', () => {
        expect(renderResult.container.querySelector('path')?.getAttribute('d')).toBe('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
    })
    it('FeedBackBox component button is working', () => {
        const button = renderResult.getByRole('btn-close')
        fireEvent.click(button)
        expect(onClose).toHaveBeenCalled()
        expect(renderResult.container.firstChild).toBeNull()
    })
})
