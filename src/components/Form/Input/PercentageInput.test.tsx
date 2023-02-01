import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import PercentageInput from './PercentageInput'

const defaultProps = {
    role: 'percentage-input',
    onChange: vi.fn()
}

describe('<PercentageInput />', () => {
    const onChange = vi.fn()

    it('value should not be rendered since the format "100." is not valid', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '100.' } })
        expect(input.value).not.toBe('100.')
    })

    it('value should not be rendered since the format "200" is not valid', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '200' } })
        expect(input.value).not.toBe('200')
    })

    it('value should not be rendered since the format "12.33." is not valid', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '12.33.' } })
        expect(input.value).not.toBe('12.33.')
    })

    it('value should not be rendered since the format "-12.33" is not valid', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '-12.33' } })
        expect(input.value).not.toBe('-12.33')
    })

    it('should render the value correctly since "12.33" is a valid format', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '12.33' } })
    })

    it('should render the value correctly since "100" is a valid format', () => {
        const { getByRole } = render(<PercentageInput {...defaultProps} />)
        const input = getByRole('percentage-input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '100' } })
        expect(input.value).toBe('100')
    })
})
