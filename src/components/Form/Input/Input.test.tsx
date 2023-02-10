import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Input from './Input'

describe('<Input />', () => {
    it('renders BaseInput when type is text', () => {
        const { getByTestId } = render(<Input type="text" data-testid="base-input" />)
        const inputElement = getByTestId('base-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders CurrencyInput when type is currency', () => {
        const { getByTestId } = render(<Input type="currency" data-testid="currency-input" />)
        const inputElement = getByTestId('currency-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders PasswordInput when type is password', () => {
        const { getByTestId } = render(<Input type="password" data-testid="password-input" />)
        const inputElement = getByTestId('password-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders DateInput with correct placeholder when type is date', () => {
        const { getByPlaceholderText } = render(<Input type="date" placeholder="dd/mm/year" />)
        const inputElement = getByPlaceholderText('dd/mm/year')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders YearInput with correct placeholder when type is year', () => {
        const { getByPlaceholderText } = render(<Input type="year" placeholder="yyyy" />)
        const inputElement = getByPlaceholderText('yyyy')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders MonthInput when type is month', () => {
        const { getByTestId } = render(<Input type="month" data-testid="month-input" />)
        const inputElement = getByTestId('month-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders PercentageInput when type is percentage', () => {
        const { getByTestId } = render(<Input type="percentage" data-testid="percentage-input" />)
        const inputElement = getByTestId('percentage-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders NumberInput when type is number', () => {
        const { getByTestId } = render(<Input type="percentage" data-testid="number-input" />)
        const inputElement = getByTestId('number-input')
        expect(inputElement).toBeInTheDocument()
    })

    it('renders BaseInput when type is not specified or is not a valid value', () => {
        const { getByTestId } = render(<Input data-testid="base-input" />)
        const inputElement = getByTestId('base-input')
        expect(inputElement).toBeInTheDocument()
    })
})
