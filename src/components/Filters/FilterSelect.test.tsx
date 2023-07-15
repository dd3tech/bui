import { RenderResult, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterSelect, { IRadioItems } from './FilterSelect'

const list: IRadioItems = {
  a: {
    label: 'Radio button label A'
  },
  b: {
    label: 'Radio button label B'
  },
  'Radio button': {
    disabled: true
  }
}

const onApply = vi.fn((val: string) => console.log(val))
const onReset = vi.fn()
const defaultProps = {
  listItems: list,
  onApply: onApply,
  onReset: onReset,
  actionContent: <button data-testid="btn-action">Filter Select Action</button>
}

function openDialog(getByTestId: RenderResult['getByTestId']) {
  const btnOpen = getByTestId('btn-action')
  fireEvent.click(btnOpen)
}

describe('<FilterSelect/>', () => {
  it('should be rendered with 3 Child Radios', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelect {...defaultProps} />
    )

    openDialog(getByTestId)

    const filterSelect = getByRole('radio-group')
    expect(filterSelect).toBeDefined()
    expect(filterSelect.childElementCount).toEqual(3)
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelect {...defaultProps} />
    )

    openDialog(getByTestId)
    const applyBtn = getByRole('confirm-btn')
    fireEvent.click(applyBtn)

    openDialog(getByTestId)
    const resetBtn = getByRole('cancel-btn')
    fireEvent.click(resetBtn)

    expect(onApply).toHaveBeenCalled()
    expect(onApply).toHaveBeenCalledTimes(1)
    expect(onReset).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('the selected value must be checked', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelect {...defaultProps} />
    )

    openDialog(getByTestId)

    const radioList = Array.from(getByRole('radio-group').children)
    const radio = radioList[0].querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement
    fireEvent.click(radio)

    expect(radio.checked).toBeTruthy()
  })
})
