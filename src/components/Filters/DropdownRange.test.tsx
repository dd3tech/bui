import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import DropdownRange, { DropdownRangeProps } from './DropdownRange'

const props = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  onSubmit: vi.fn(),
  onClose: vi.fn(),
  title: 'Title',
  align: 'left' as DropdownRangeProps['align'],
  min: 0,
  max: 100,
  initMaxValue: 50,
  initMinValue: 10,
  unitName: 'Unit'
}

describe('<DropdownRange/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<DropdownRange {...props} />)

    expect(getByRole('dropdown-range')).toBeDefined()
  })

  it('should call onSubmit', () => {
    const { getByRole } = render(<DropdownRange {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('combo-select-submit'))

    expect(props.onSubmit).toHaveBeenCalledWith({
      maxVal: 50,
      minVal: 10
    })
  })

  it('should call onClose', () => {
    const { getByRole } = render(<DropdownRange {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('combo-select-clear'))

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })
})
