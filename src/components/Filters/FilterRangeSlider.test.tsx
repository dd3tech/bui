import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import { RangeValues } from 'components/RangeSlider/RangeSlider'
import FilterRangeSlider, { FilterRangeSliderProps } from './FilterRangeSlider'

const onApply = vi.fn((range: RangeValues) => alert(range))
const onReset = vi.fn()
const defaultProps: FilterRangeSliderProps = {
  onApply,
  onReset
}

describe('<FilterRangeSlider/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { container } = render(<FilterRangeSlider onApply={onApply} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole } = render(
      <FilterRangeSlider {...defaultProps} initMinValue={1} initMaxValue={30} />
    )

    const applyBtn = getByRole('combo-select-submit')
    fireEvent.click(applyBtn)
    expect(onApply).toHaveBeenCalled()
    expect(onApply).toHaveBeenCalledTimes(1)

    const resetBtn = getByRole('combo-select-clear')
    fireEvent.click(resetBtn)
    expect(onReset).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
