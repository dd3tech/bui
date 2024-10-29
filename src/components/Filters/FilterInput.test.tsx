import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterInput, { FilterInputProps } from './FilterInput'

const props = {
  label: 'label',
  secondaryLabel: 'secondaryLabel',
  value: 'value',
  variant: 'primary' as FilterInputProps['variant'],
  disabled: false,
  isActive: true,
  setIsActive: vi.fn()
}

describe('<FilterInput/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<FilterInput {...props} />)

    expect(getByRole('filter-input')).toBeDefined()
  })

  it('should call setIsActive when clicked', () => {
    const { getByRole } = render(<FilterInput {...props} />)

    getByRole('filter-input').click()

    expect(props.setIsActive).toHaveBeenCalled()
  })

  it('should not call setIsActive when disabled', () => {
    const { getByRole } = render(<FilterInput {...props} disabled />)

    getByRole('filter-input').click()

    expect(props.setIsActive).not.toHaveBeenCalled()
  })

  it('should display value', () => {
    const { getByRole } = render(<FilterInput {...props} />)
    const input = getByRole('filter-input-value') as HTMLInputElement

    expect(input.value).toBe(props.value)
  })
})
