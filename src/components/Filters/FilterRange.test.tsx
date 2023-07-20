import { RenderResult, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterRange, { FilterRangeProps, IRange } from './FilterRange'

const onApply = vi.fn((range: IRange) => console.log(range))
const onReset = vi.fn()

const defaultProps: FilterRangeProps = {
  onApply,
  onReset,
  actionContent: <button data-testid="btn-action">Filter Range Action</button>
}

function openDialog(getByTestId: RenderResult['getByTestId']) {
  const btnOpen = getByTestId('btn-action')
  fireEvent.click(btnOpen)
}

describe('<FilterRange/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { container } = render(<FilterRange {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole, getByTestId } = render(
      <FilterRange {...defaultProps} defaultMin={1} defaultMax={30} />
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

  it('the min and max values should change', () => {
    const { getByTestId } = render(<FilterRange {...defaultProps} />)

    openDialog(getByTestId)

    const card = getByTestId('card-contain')
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
    const { getByTestId, getByRole } = render(
      <FilterRange {...defaultProps} min={10} max={50} />
    )

    openDialog(getByTestId)

    const card = getByTestId('card-contain')
    const inputMin = card.querySelector(
      'input[name="minVal"]'
    ) as HTMLInputElement
    const inputMax = card.querySelector(
      'input[name="maxVal"]'
    ) as HTMLInputElement
    const applyBtn = getByRole('confirm-btn')

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
