import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import MonthInput from './MonthInput'

describe('<MonthInput />', () => {
  const mockOnChange = vi.fn()
  it('was renderer', () => {
    const { container, getByRole } = render(<MonthInput role="input" />)
    expect(container.children).toBeDefined()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('DatePicker was rendering', () => {
    const { getByRole, getByTestId } = render(
      <MonthInput onChange={mockOnChange} data-testid="month-input" />
    )
    const endAdornment = getByTestId('endAdornment')

    expect(endAdornment.children.length).toEqual(1)
    fireEvent.click(getByRole('active-calendar'))

    const datePicker = getByRole('calendar-container')
    expect(endAdornment.children.length).toEqual(2)
    expect(datePicker).toBeInTheDocument()

    fireEvent.click(getByRole('active-calendar'))
    expect(datePicker).not.toBeInTheDocument()
  })

  it('input onDateChange callback', () => {
    const { getAllByRole, getByRole } = render(
      <MonthInput
        onChange={mockOnChange}
        language="en"
        data-testid="month-input"
      />
    )
    fireEvent.click(getByRole('active-calendar'))
    fireEvent.click(getAllByRole('month')[0])
    expect(mockOnChange).toHaveBeenCalledWith({
      target: { value: '0', name: undefined }
    })
  })

  it('check default value', () => {
    const { getByTestId, rerender } = render(
      <MonthInput value={2} language="en" data-testid="month-input" />
    )
    const input = getByTestId('month-input') as HTMLInputElement
    expect(input.value).toBe('March')

    rerender(<MonthInput value={2} language="es" data-testid="month-input" />)
    expect(input.value).toBe('Marzo')
  })

  it('we check that if we pass a default value that is outside the 12-month range, it returns an empty string', () => {
    const { getByTestId } = render(
      <MonthInput value={13} language="en" data-testid="month-input" />
    )
    const input = getByTestId('month-input') as HTMLInputElement
    expect(input.value).toBe('')
  })
})
