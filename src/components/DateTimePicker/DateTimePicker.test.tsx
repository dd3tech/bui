import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import DateTimePicker from './DateTimePicker'

describe('<DateTimePicker />', () => {
  const mockOnChange = vi.fn()
  it('DateTimePicker should format the input and toggle the date time picker', () => {
    const { getByTestId } = render(
      <DateTimePicker onChange={mockOnChange} data-testid="date-time-picker" />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    fireEvent.change(input, { target: { value: '030420240230pm' } })
    expect(input.value).toBe('03/04/2024 02:30 PM')
  })

  it('if the value passed by prop contains 4 characters you must format it correctly', () => {
    const { getByTestId } = render(
      <DateTimePicker
        onChange={mockOnChange}
        value="1002"
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    expect(input.value).toBe('10/02')
  })

  it('if the value passed by prop contains 6 characters you must format it correctly', () => {
    const { getByTestId } = render(
      <DateTimePicker
        onChange={mockOnChange}
        value="10/02/20"
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    expect(input.value).toBe('10/02/20')
  })

  it('if the value passed by prop contains 19 or more characters you must format it correctly', () => {
    const { getByTestId } = render(
      <DateTimePicker
        onChange={mockOnChange}
        value="10/02/20250611pm46"
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    expect(input.value).toBe('10/02/2025 06:11 PM')
  })

  it('should render red border when entering a year less than 1000', () => {
    const { getByTestId, container } = render(
      <DateTimePicker onChange={mockOnChange} data-testid="date-time-picker" />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    fireEvent.change(input, { target: { value: '1001500' } })

    expect(container.firstChild?.firstChild).toHaveClass('border-error')
  })

  describe('checking variant types', () => {
    it('it should display the "active" variant correctly', () => {
      const { container } = render(
        <DateTimePicker variant="active" data-testid="date-time-picker" />
      )
      expect(container.firstChild?.firstChild).toHaveClass('border-blue-500')
    })

    it('it should display the "success" variant correctly', () => {
      const { container } = render(
        <DateTimePicker variant="success" data-testid="date-time-picker" />
      )
      expect(container.firstChild?.firstChild).toHaveClass('border-success')
    })

    it('it should display the "warning" variant correctly', () => {
      const { container } = render(
        <DateTimePicker variant="warning" data-testid="date-time-picker" />
      )
      expect(container.firstChild?.firstChild).toHaveClass('border-warning')
    })
  })

  it('DateTimePicker was rendering', () => {
    const { getByRole, getByTestId } = render(
      <DateTimePicker onChange={mockOnChange} data-testid="date-time-picker" />
    )
    const endAdornment = getByTestId('endAdornment')

    expect(endAdornment.children.length).toEqual(1)
    fireEvent.click(getByRole('active-calendar'))

    const datePicker = getByRole('calendar-container')
    const timePicker = getByRole('clock-container')

    expect(endAdornment.children.length).toEqual(2)
    expect(datePicker).toBeInTheDocument()
    expect(timePicker).toBeInTheDocument()

    fireEvent.click(getByRole('active-calendar'))
    expect(datePicker).not.toBeInTheDocument()
    expect(timePicker).not.toBeInTheDocument()
  })

  it('if the value of the component is empty, it must show the error variant', () => {
    let value = '0'
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      value = event.target.value
    }
    const { getByTestId, container } = render(
      <DateTimePicker
        onChange={onChange}
        value={value}
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    fireEvent.change(input, { target: { value: '000' } })
    fireEvent.blur(input)
    expect(container.firstChild?.firstChild).toHaveClass('border-error')
  })

  it('input onDateChange callback', () => {
    const TODAY = new Date('2023-01-01T23:59:59.000Z')
    const value = TODAY.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    const { getByTestId, getByRole, getAllByRole } = render(
      <DateTimePicker
        value={value}
        onChange={mockOnChange}
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    fireEvent.click(getByRole('active-calendar'))
    fireEvent.click(getByRole('select-month'))
    fireEvent.click(getAllByRole('month')[TODAY.getMonth()])
    fireEvent.click(getByRole('select-month'))
    fireEvent.click(getByRole('select-year'))

    const day = TODAY.getDate().toString().padStart(2, '0')
    const month = `${TODAY.getMonth() + 1}`.padStart(2, '0')
    const year = TODAY.getFullYear()

    expect(input.value).toBe(`${day}/${month}/${year}  `)
  })

  it('should be displayed the error variant when a date greater or less than the allowed ones is provided', () => {
    const { getByTestId, container } = render(
      <DateTimePicker
        minDate={new Date(2024, 3, 1)}
        maxDate={new Date(2024, 5, 1)}
        data-testid="date-time-picker"
      />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    act(() => {
      fireEvent.change(input, { target: { value: '01/02/2023' } })
      fireEvent.blur(input)
    })
    expect(container.firstChild?.firstChild).toHaveClass('border-error')

    act(() => {
      fireEvent.change(input, { target: { value: '16/05/2023' } })
      fireEvent.blur(input)
    })
    expect(container.firstChild?.firstChild).toHaveClass('border-error')
  })

  it('the DateTimePicker should be hidden when clicking outside of it', () => {
    const { getByTestId, getByRole } = render(
      <DateTimePicker data-testid="date-time-picker" />
    )
    const input = getByTestId('date-time-picker') as HTMLInputElement

    fireEvent.click(getByRole('active-calendar'))
    expect(getByRole('calendar-container')).toBeDefined()
    expect(getByRole('clock-container')).toBeDefined()

    fireEvent.click(input)
    expect(getByRole('calendar-container')).toBeDefined()
    expect(getByRole('clock-container')).toBeDefined()

    fireEvent.click(document)
    waitFor(() => {
      expect(getByRole('calendar-container')).not.toBeDefined()
      expect(getByRole('clock-container')).not.toBeDefined()
    })
  })
})
