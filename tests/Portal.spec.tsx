import React from 'react'
import { describe, it, vi, expect } from 'vitest'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import { Portal } from '../src/common/Portal'

describe('Portal Component Tests', () => {
    beforeEach(() => {
        ReactDOM.createPortal = vi.fn((element: any, _node) => {
            return element
        })
    })

    afterEach(() => {
        const portal: any = ReactDOM.createPortal
        portal.mockClear()
    })

    it('not hidden modal is not hidden', () => {
        const { container } = render(
            <Portal>
                <p>My Portal!</p>
            </Portal>
        )
        expect(container.firstChild).toBeDefined()
    })
})
