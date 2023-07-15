import { RenderResult, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import { RangeValues } from 'components/RangeSlider/RangeSlider'
import FilterRangeSlider, { FilterRangeSliderProps } from './FilterRangeSlider'

const onApply = vi.fn((range: RangeValues) => alert(range))
const onReset = vi.fn()
const defaultProps: FilterRangeSliderProps = {
  onApply,
  onReset,
  actionContent: <button data-testid="btn-action">Filter Range Action</button>
}

function openDialog(getByTestId: RenderResult['getByTestId']) {
  const btnOpen = getByTestId('btn-action')
  fireEvent.click(btnOpen)
}

describe('<FilterRangeSlider/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { container } = render(<FilterRangeSlider {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole, getByTestId } = render(
      <FilterRangeSlider {...defaultProps} initMinValue={1} initMaxValue={30} />
    )

    openDialog(getByTestId)

    const applyBtn = getByRole('confirm-btn')
    fireEvent.click(applyBtn)
    expect(onApply).toHaveBeenCalled()
    expect(onApply).toHaveBeenCalledTimes(1)

    openDialog(getByTestId)

    const resetBtn = getByRole('cancel-btn')
    fireEvent.click(resetBtn)
    expect(onReset).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
