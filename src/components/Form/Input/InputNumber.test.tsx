import { render, fireEvent, prettyDOM, act } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import NumberInput from './InputNumber'

const defaultProps = {
    role: 'number-input',
    onChange: vi.fn(),
    value: 2
}

describe('<NumberInput />', () => {
    it('should render the value correctly since it is numeric', () => {
        const { getByRole } = render(<NumberInput {...defaultProps} />)
        const input = getByRole('number-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '11223344' } })
        expect(input.value).toBe('11223344')
    })

    it('should not render the value since it is not of numeric type', () => {
        const { getByRole } = render(<NumberInput {...defaultProps} />)
        const input = getByRole('number-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: 'Testing' } })
        expect(input.value).not.toBe('Testing')
    })

    describe('<Props: controllers />', () => {
        it('should render the changed value on decrement', () => {
            const { getByRole } = render(<NumberInput {...defaultProps} controllers />)
            const input = getByRole('number-input') as HTMLInputElement
            const buttonDecrement = getByRole('decrement-number')

            expect(input.value).toBe('2')

            fireEvent.click(buttonDecrement)

            expect(input.value).toBe('1')
        })

        it('should not render a negative value when decrementing', () => {
            const { getByRole } = render(<NumberInput {...defaultProps} value={0} controllers />)
            const input = getByRole('number-input') as HTMLInputElement
            const buttonDecrement = getByRole('decrement-number')

            expect(input.value).toBe('0')

            fireEvent.click(buttonDecrement)

            expect(input.value).not.toBe('-1')
        })

        it('should render the changed value on increment', () => {
            const { getByRole } = render(<NumberInput {...defaultProps} controllers />)
            const input = getByRole('number-input') as HTMLInputElement
            const buttonIncrement = getByRole('increment-number')

            expect(input.value).toBe('2')

            fireEvent.click(buttonIncrement)

            expect(input.value).toBe('3')
        })
    })
})
