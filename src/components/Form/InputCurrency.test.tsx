import { it, describe, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import InputCurrency from './InputCurrency'

const defaultProps = {
  className: 'text-error',
  name: 'Test',
  placeholder: 'Placeholder test',
  onChange: vi.fn(),
  prefix: '$',
  value: 40,
  disabled: false,
  onFocus: vi.fn(),
  role: 'role-input'
}

describe('<InputCurrency/>', () => {
  it('should be render', () => {
    const { container } = render(<InputCurrency {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it('must render the value with the indicated format', () => {
    const { getByRole } = render(
      <InputCurrency {...defaultProps} value={'10222222.33'} />
    )

    expect(getByRole('role-input').getAttribute('value')).toEqual(
      '$10,222,222.33'
    )
  })

  describe('Props:should be render', () => {
    it('className', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)
      expect(getByRole('role-input').className).toContain('text-error')
    })

    it('value and prefix', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)

      expect(getByRole('role-input').getAttribute('value')).toEqual('$40')
    })

    it('name', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)

      expect(getByRole('role-input').getAttribute('name')).toEqual('Test')
    })

    it('placeholder', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)

      expect(getByRole('role-input').getAttribute('placeholder')).toBe(
        'Placeholder test'
      )
    })

    it('disabled', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)
      expect(getByRole('role-input')).not.toBeDisabled()
    })

    it('onChange', () => {
      const { getByRole } = render(<InputCurrency {...defaultProps} />)
      fireEvent.change(getByRole('role-input'), { target: { value: '123' } })

      expect(defaultProps.onChange).toHaveBeenCalled()
    })
  })
})
