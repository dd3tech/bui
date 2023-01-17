import { fireEvent, render } from '@testing-library/react'
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
const onReset = vi.fn(() => {})
const defaultProps = {
    listItems: list,
    position: { show: true, left: 0, top: 0 },
    onApply: onApply,
    onReset: onReset
}

describe('<FilterSelect/>', () => {
    it('should be rendered with 3 Child Radios', () => {
        const { getByRole } = render(<FilterSelect {...defaultProps} />)
        const filterSelect = getByRole('radio-group')

        expect(filterSelect).toBeDefined()
        expect(filterSelect.childElementCount).toEqual(3)
    })

    it('should call a function when the apply and reset button are clicked', () => {
        const { getByRole } = render(<FilterSelect {...defaultProps} />)
        const applyBtn = getByRole('confirm-btn')
        fireEvent.click(applyBtn)
        const resetBtn = getByRole('cancel-btn')
        fireEvent.click(resetBtn)

        expect(onApply).toHaveBeenCalled()
        expect(onApply).toHaveBeenCalledTimes(1)
        expect(onReset).toHaveBeenCalled()
        expect(onReset).toHaveBeenCalledTimes(1)
    })

    it('the selected value must be checked', () => {
        const { getByRole } = render(<FilterSelect {...defaultProps} />)
        const radioList = Array.from(getByRole('radio-group').children)
        const radio = radioList[0].querySelector('input[type="radio"]') as HTMLInputElement
        fireEvent.click(radio)

        expect(radio.checked).toBeTruthy()
    })
})
