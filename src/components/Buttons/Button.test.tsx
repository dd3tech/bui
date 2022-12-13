import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('<Button/>', () => {
    it('should be render', () => {
        const { container } = render(<Button />)
        expect(container.firstChild).toBeDefined()
    })

    describe('prop: disabled', () => {
        it('should render button disabled', () => {
            render(<Button disabled />)
            expect(screen.getByRole('button')).toBeDisabled()
        })

        it('should render button not disabled', () => {
            render(<Button disabled={false} />)
            expect(screen.getByRole('button')).not.toBeDisabled()
        })
    })
})
