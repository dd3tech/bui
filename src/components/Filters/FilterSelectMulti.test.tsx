import { RenderResult, fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterSelectMulti, { ICheckBoxItems } from './FilterSelectMulti'

const list: ICheckBoxItems = {
  optionA: {},
  optionB: {},
  optionC: {
    disabled: true
  }
}

const onApply = vi.fn()
const onReset = vi.fn()
const defaultProps = {
  initialItemList: list,
  position: { show: true, left: 0, top: 0 },
  onApply: onApply,
  onReset: onReset,
  actionContent: (
    <button data-testid="btn-action">Filter Select Multi Action</button>
  )
}

function openDialog(getByTestId: RenderResult['getByTestId']) {
  const btnOpen = getByTestId('btn-action')
  fireEvent.click(btnOpen)
}

describe('<FilterSelectMulti/>', () => {
  it('should be rendered with 3 Child Checkbox', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelectMulti {...defaultProps} />
    )
    openDialog(getByTestId)

    const filterSelectMulti = getByRole('checkbox-group')
    expect(filterSelectMulti).toBeDefined()
    expect(filterSelectMulti.childElementCount).toEqual(3)
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelectMulti {...defaultProps} />
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

  it('the selected value must be checked and unchecked', () => {
    const { getByRole, getByTestId } = render(
      <FilterSelectMulti {...defaultProps} />
    )
    openDialog(getByTestId)

    const checkboxList = Array.from(getByRole('checkbox-group').children)
    const checkbox = checkboxList[0].querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBeTruthy()
    fireEvent.click(checkbox)
    expect(checkbox.checked).not.toBeTruthy()
  })
})
