import { RefObject } from 'react'
import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import RangeSlider, { updateBar } from './RangeSlider'

const defaultProps = {
  min: 0,
  max: 100,
  onChange: vi.fn()
}

describe('<RangeSlider/>', () => {
  it('should be render', () => {
    const { container } = render(<RangeSlider {...defaultProps} />)
    expect(container).toBeDefined()
  })

  describe('prop: minValDisabled, maxValDisabled', () => {
    it('should render a RangeSlider with both controllers disabled', () => {
      const { container } = render(
        <RangeSlider {...defaultProps} minValDisabled maxValDisabled />
      )
      const minInput = container.querySelector(
        'input[name="min-val"]'
      ) as HTMLInputElement
      const maxInput = container.querySelector(
        'input[name="max-val"]'
      ) as HTMLInputElement
      expect(minInput).toBeDisabled()
      expect(maxInput).toBeDisabled()
    })
  })

  it('should call a function when the min or max value change', () => {
    const { container } = render(<RangeSlider {...defaultProps} />)
    const minInput = container.querySelector(
      'input[name="min-val"]'
    ) as HTMLInputElement
    const maxInput = container.querySelector(
      'input[name="max-val"]'
    ) as HTMLInputElement

    fireEvent.change(minInput, { target: { value: '50' } })
    fireEvent.change(maxInput, { target: { value: '70' } })

    expect(defaultProps.onChange).toHaveBeenCalled()
    expect(minInput).toHaveValue('50')
    expect(maxInput).toHaveValue('70')
  })

  it('updateBar should update the style of the range div', () => {
    const range: RefObject<HTMLDivElement> = {
      current: document.createElement('div')
    }
    const input = { name: 'max-val', value: '5' }
    updateBar(input as HTMLInputElement, range, 2, 0, 10)

    expect(range.current?.style.left).toEqual('20%')
    expect(range.current?.style.width).toEqual('30%')
  })
})
