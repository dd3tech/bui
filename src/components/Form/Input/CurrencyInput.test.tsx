import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import CurrencyInput from './CurrencyInput'

const props = {
  'data-testid': 'input',
  onChange: vi.fn(),
  onFocus: vi.fn(),
  onBlur: vi.fn(),
  prefix: '$'
}

const renderComponent = () => {
  return render(<CurrencyInput {...props} />)
}

describe('<CurrencyInput />', () => {
  it('should be render', () => {
    const { container } = renderComponent()
    expect(container.firstChild).toBeDefined()
  })

  it('onFocus should be work', () => {
    const { getByTestId } = renderComponent()

    const input = getByTestId('input') as HTMLInputElement
    const inputValue = 12345.5
    fireEvent.focus(input, { target: { value: inputValue } })

    expect(input.value).toBe(String(inputValue))
  })

  it('onChange should be change a value', () => {
    const { getByTestId } = renderComponent()
    const input = getByTestId('input') as HTMLInputElement

    fireEvent.change(input, { target: { value: '12345.5' } })
    expect(input.value).toBe('$12,345.5')
    fireEvent.change(input, { target: { value: '12345.58999' } })
    expect(input.value).toBe('$12,345.58')
    fireEvent.change(input, { target: { value: '12345.' } })
    expect(input.value).toBe('$12,345.')
  })

  it('onBlur should be work', () => {
    const { getByTestId } = renderComponent()

    const input = getByTestId('input') as HTMLInputElement
    const inputValue = 12345.5
    fireEvent.blur(input, { target: { value: inputValue } })

    expect(input.value).toBe(String(inputValue))
  })
})
