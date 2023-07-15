import { fireEvent, render } from '@testing-library/react'
import { expect, vi } from 'vitest'
import ConfirmDialog, { ConfirmDialogProps } from './ConfirmDialog'

const onClick = vi.fn(() => 0)
const defaultProps: ConfirmDialogProps = {
  title: 'This is a title',
  children: 'Content',
  handleConfirm: onClick,
  actionContent: (
    <button className="w-52" data-testid="btn-action">
      This is the action content
    </button>
  )
}

describe('<FilterSelect/>', () => {
  it('should be rendered with content and title', () => {
    const { getByTestId, queryByTestId } = render(
      <ConfirmDialog {...defaultProps} />
    )

    const btnOpen = getByTestId('btn-action')

    expect(queryByTestId('card-contain')).toBeNull()
    fireEvent.click(btnOpen)

    const confirmDialog = queryByTestId('card-contain')

    expect(confirmDialog?.children[0]).toHaveTextContent('This is a title')
    expect(confirmDialog).toHaveTextContent('Content')
  })

  it('should call a function when the apply button is clicked', () => {
    const { getByRole, getByTestId } = render(
      <ConfirmDialog {...defaultProps} />
    )

    const btnOpen = getByTestId('btn-action')
    fireEvent.click(btnOpen)

    const confirmBtn = getByRole('confirm-btn')
    fireEvent.click(confirmBtn)

    expect(onClick).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
