import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import ConfirmDialog, { IConfirmDialog } from './ConfirmDialog'

const onClick = vi.fn(() => 0)
const defaultProps: IConfirmDialog = {
    title: 'This is a title',
    children: 'Content',
    onConfirm: onClick,
    position: { show: true, left: 0, top: 0 }
}

describe('<FilterSelect/>', () => {
    it('should be rendered with content and title', () => {
        const { getByTestId } = render(<ConfirmDialog {...defaultProps} />)
        const confirmDialog = getByTestId('card-contain')

        expect(confirmDialog.children[0]).toHaveTextContent('This is a title')
        expect(confirmDialog).toHaveTextContent('Content')
    })

    it('should call a function when the apply button is clicked', () => {
        const { getByRole } = render(<ConfirmDialog {...defaultProps} />)
        const confirmBtn = getByRole('confirm-btn')
        fireEvent.click(confirmBtn)

        expect(onClick).toHaveBeenCalled()
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
