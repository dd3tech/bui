import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ComboSelect from './ComboSelect'

const defaultProps = {
  label: 'Test Label',
  submitText: 'Apply',
  clearText: 'Clear',
  onSubmit: vi.fn(),
  onClear: vi.fn()
}

describe('<ComboSelect>', () => {
  it('should render correctly', () => {
    const { getByRole } = render(
      <ComboSelect {...defaultProps}>
        <div>Content</div>
      </ComboSelect>
    )

    expect(getByRole('combo-select')).toBeDefined()
  })

  it('display label', () => {
    const { getByRole } = render(
      <ComboSelect {...defaultProps}>
        <div>Content</div>
      </ComboSelect>
    )

    expect(getByRole('combo-select-label')).toHaveTextContent('Test Label')
  })

  it('render children', () => {
    const { getByRole, getByTestId } = render(
      <ComboSelect {...defaultProps}>
        <div data-testid="child-component">Children</div>
      </ComboSelect>
    )

    expect(getByRole('combo-select-content')).toBeDefined()
    expect(getByTestId('child-component')).toHaveTextContent('Children')
  })

  it('show acction buttons', () => {
    const { getByRole } = render(
      <ComboSelect {...defaultProps}>
        <div>Content</div>
      </ComboSelect>
    )

    expect(getByRole('combo-select-clear')).toHaveTextContent('Clear')
    expect(getByRole('combo-select-submit')).toHaveTextContent('Apply')
  })

  it('execute callbacks correctly', () => {
    const { getByRole } = render(
      <ComboSelect {...defaultProps}>
        <div>Content</div>
      </ComboSelect>
    )

    fireEvent.click(getByRole('combo-select-clear'))
    expect(defaultProps.onClear).toHaveBeenCalled()

    fireEvent.click(getByRole('combo-select-submit'))
    expect(defaultProps.onSubmit).toHaveBeenCalled()
  })
})
