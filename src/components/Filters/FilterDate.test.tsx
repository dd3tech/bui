import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterDate, { FilterDateProps } from './FilterDate'

const onApply = vi.fn()
const onReset = vi.fn()

const defaultProps: FilterDateProps = {
  onApply,
  onReset,
  position: { show: true, left: 0, top: 0 }
}

describe('<FilterDate/>', () => {
  it('should be rendered', () => {
    const { container } = render(<FilterDate {...defaultProps} />)
    expect(container).toBeDefined()
  })

  it('should call a function when the apply and reset button are clicked', () => {
    const { getByRole } = render(<FilterDate {...defaultProps} />)

    const applyBtn = getByRole('confirm-btn')
    fireEvent.click(applyBtn)
    expect(onApply).toHaveBeenCalled()
    expect(onApply).toHaveBeenCalledTimes(1)

    const resetBtn = getByRole('cancel-btn')
    fireEvent.click(resetBtn)
    expect(onReset).toHaveBeenCalled()
    expect(onReset).toHaveBeenCalledTimes(1)
  })

  it('should be call handleChange when changing the value of the date picker', () => {
    const { getByRole, getAllByRole } = render(<FilterDate {...defaultProps} />)

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
    const filter = getByTestId('card-contain')

    expect(filter).toHaveTextContent('Year')
    expect(filter).toHaveTextContent('Month')
  })
})
