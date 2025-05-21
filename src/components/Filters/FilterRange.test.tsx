import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterRange, { FilterRangeProps, IRange } from './FilterRange'

const onApply = vi.fn((range: IRange) => console.log(range))
const onReset = vi.fn()

const defaultProps: FilterRangeProps = {
  onApply,
  onReset
}

describe('<FilterRange/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { container } = render(<FilterRange onApply={onApply} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole } = render(
      <FilterRange {...defaultProps} defaultMin={1} defaultMax={30} />
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

  it('the min and max values should change', () => {
    const { getByRole } = render(<FilterRange {...defaultProps} />)
    const card = getByRole('combo-select-content')
    const inputMin = card.querySelector(
      'input[name="minVal"]'
    ) as HTMLInputElement

    fireEvent.change(inputMin, { target: { value: 50 } })
    expect(inputMin.value).toBe('50')

    const inputMax = card.querySelector(
      'input[name="maxVal"]'
    ) as HTMLInputElement
    fireEvent.change(inputMax, { target: { value: 100 } })
    expect(inputMax.value).toBe('100')
  })

  it('should not return a value if the entered range is not allowed', () => {
    const { getByRole } = render(
      <FilterRange {...defaultProps} min={10} max={50} />
    )
    const card = getByRole('combo-select-content')
    const inputMin = card.querySelector(
      'input[name="minVal"]'
    ) as HTMLInputElement
    const inputMax = card.querySelector(
      'input[name="maxVal"]'
    ) as HTMLInputElement
    const applyBtn = getByRole('combo-select-submit')

    fireEvent.change(inputMin, { target: { value: 9 } })

    fireEvent.click(applyBtn)
    expect(onApply).not.toBeCalled()

    fireEvent.change(inputMin, { target: { value: 11 } })
    fireEvent.change(inputMax, { target: { value: 51 } })

    fireEvent.click(applyBtn)
    expect(onApply).not.toBeCalled()

    fireEvent.change(inputMin, { target: { value: 40 } })
    fireEvent.change(inputMax, { target: { value: 30 } })

    fireEvent.click(applyBtn)
    expect(onApply).not.toBeCalled()
  })
})
