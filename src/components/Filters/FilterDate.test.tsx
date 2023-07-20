import { vi } from 'vitest'
import { RenderResult, fireEvent, render } from '@testing-library/react'
import FilterDate, { FilterDateProps } from './FilterDate'

const onApply = vi.fn()
const onReset = vi.fn()

const defaultProps: FilterDateProps = {
  onApply,
  onReset,
  actionContent: <button data-testid="btn-action">Filter Date Action</button>
}

function openDialog(getByTestId: RenderResult['getByTestId']) {
  const btnOpen = getByTestId('btn-action')
  fireEvent.click(btnOpen)
}

describe('<FilterDate/>', () => {
  it('should be rendered', () => {
    const { container } = render(<FilterDate {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole, getByTestId } = render(<FilterDate {...defaultProps} />)

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

  it('should be call handleChange when changing the value of the date picker', () => {
    const { getByRole, getAllByRole, getByTestId } = render(
      <FilterDate {...defaultProps} />
    )

    openDialog(getByTestId)

    fireEvent.click(getByRole('active-calendar'))
    fireEvent.click(getAllByRole('month')[4])
    const applyBtn = getByRole('confirm-btn')
    fireEvent.click(applyBtn)

    expect(onApply).toHaveBeenCalledWith({ month: '4', year: '' })
  })

  it('should be rendered with the correct language', () => {
    const { getByTestId } = render(
      <FilterDate {...defaultProps} language="en" />
    )

    openDialog(getByTestId)

    const filter = getByTestId('card-contain')

    expect(filter).toHaveTextContent('Year')
    expect(filter).toHaveTextContent('Month')
  })
})
