import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import DropdownRangeSlider, {
  DropdownRangeSliderProps
} from './DropdownRangeSlider'

const props = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  onSubmit: vi.fn(),
  onClose: vi.fn(),
  title: 'Title',
  align: 'left' as DropdownRangeSliderProps['align'],
  min: 0,
  max: 100,
  initMaxValue: 50,
  initMinValue: 10,
  unitName: 'Unit'
}

describe('<DropdownRangeSlider/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<DropdownRangeSlider {...props} />)

    expect(getByRole('dropdown-range-slider')).toBeDefined()
  })

  it('should call onSubmit', () => {
    const { getByRole } = render(<DropdownRangeSlider {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('combo-select-submit'))

    expect(props.onSubmit).toHaveBeenCalledWith({
      max: 50,
      min: 10
    })
  })

  it('should call onClose', () => {
    const { getByRole } = render(<DropdownRangeSlider {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('combo-select-clear'))

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })
})
