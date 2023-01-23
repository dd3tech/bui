import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import YearInput from './YearInput'

describe('<YearInput />', () => {
    const mockChange = vi.fn

    it('was renderer', () => {
        const { container, getByRole } = render(<YearInput role="input" />)
        expect(container.children).toBeDefined()
        expect(getByRole('input')).toBeInTheDocument()
    })

    it('it must allow adding a number of maximum 4 digits', () => {
        const { getByRole } = render(<YearInput role="input" value={1998} onChange={mockChange} />)
        const input = getByRole('input') as HTMLInputElement

        fireEvent.change(getByRole('input'), { target: { value: '222245' } })
        expect(input.value).toEqual('1998')
        fireEvent.change(getByRole('input'), { target: { value: '2022' } })
        expect(input.value).toEqual('2022')
    })

    it('DatePicker is rendered and removed correctly when clicking the calendar button', () => {
        const { getByRole } = render(<YearInput role="input" />)
        const button = getByRole('toggle-calendar')

        fireEvent.click(button)
        const datePicker = getByRole('calendar-container')
        expect(datePicker).toBeInTheDocument()

        fireEvent.click(button)
        expect(datePicker).not.toBeInTheDocument()
    })

    it('select a date from the calendar and update the value of the input with the selected value', () => {
        const { getByRole } = render(<YearInput role="input" onChange={mockChange} />)
        const input = getByRole('input') as HTMLInputElement
        const button = getByRole('toggle-calendar')
        const defaultYear = new Date().getFullYear()
        const newYear = defaultYear - 4

        fireEvent.click(button)
        const buttonYear = getByRole(newYear)
        fireEvent.click(buttonYear)
        expect(input.value).toEqual(newYear.toString())
    })
})
