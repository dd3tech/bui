import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import CurrencyInput from './CurrencyInput'

describe('<CurrencyInput />', () => {
    it('formats input value as currency', () => {
        const onChange = vi.fn()
        const { getByTestId } = render(<CurrencyInput data-testid="input" onChange={onChange} />)
        const input = getByTestId('input') as HTMLInputElement

        fireEvent.change(input, { target: { value: '12345.5' } })
        expect(input.value).toBe('12,345.5')
        fireEvent.change(input, { target: { value: '12345.58999' } })
        expect(input.value).toBe('12,345.58')
        fireEvent.change(input, { target: { value: '12345.' } })
        expect(input.value).toBe('12,345.')
    })
})
