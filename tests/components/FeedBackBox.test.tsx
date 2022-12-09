import React from 'react'
import { it, describe, vi } from 'vitest'
import { fireEvent, render, RenderResult } from '@testing-library/react'

import { FeedBackBox, FeedBackBoxProps } from '../../src/components'

const defaultProps: FeedBackBoxProps = {
    title: 'Awesome Title',
    description: 'This is a description',
    type: 'success',
    txtCloseBtn: 'Close',
    onClose: vi.fn()
}

describe('<FeedBackBox/>', () => {
    it('should be render', () => {
        const { container } = render(<FeedBackBox {...defaultProps} />)
        expect(container.firstChild).toBeDefined()
    })

    it('should be render display texts', () => {
        const { getByText } = render(<FeedBackBox {...defaultProps} />)

        expect(getByText('Awesome Title')).toBeDefined()
        expect(getByText('This is a description')).toBeDefined()
        expect(getByText('Close')).toBeDefined()
    })

    it('it can be passed a default value from outside and it should render correctly', () => {
        const { container } = render(<FeedBackBox {...defaultProps} defaultIsClose={true} />)

        expect(container.firstChild).toBeNull()
    })

    it('if the cancel button is clicked it should be hidden', () => {
        const { getByRole, container } = render(<FeedBackBox {...defaultProps} />)

        const button = getByRole('btn-close')
        fireEvent.click(button)

        expect(defaultProps.onClose).toHaveBeenCalledTimes(1)
        expect(container.firstChild).toBeNull()
    })

    describe('prop: type', () => {
        it('when type is success, should be render with a green color', () => {
            const { getByRole } = render(<FeedBackBox {...defaultProps} />)
            expect(getByRole('feedback-box').className).toContain('border-green-500')
        })

        it('when type is success, should be render with CheckCircleIcon', () => {
            const { container } = render(<FeedBackBox {...defaultProps} />)
            expect(container.querySelector('path')?.getAttribute('d')).toBe('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')
        })

        it('when type is error, should be render with red color', () => {
            const { getByRole } = render(<FeedBackBox {...defaultProps} type="error" />)
            expect(getByRole('feedback-box').className).toContain('border-red-500')
        })

        it('when type is success, should be render with ExclamationIcon', () => {
            const { container } = render(<FeedBackBox {...defaultProps} type="error" />)
            expect(container.querySelector('path')?.getAttribute('d')).toBe(
                'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            )
        })
    })
})
