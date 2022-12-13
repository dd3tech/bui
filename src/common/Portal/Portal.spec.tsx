import ReactDOM from 'react-dom'
import { describe, it, vi, expect } from 'vitest'
import { render } from '@testing-library/react'

import { Portal } from './Portal'

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
