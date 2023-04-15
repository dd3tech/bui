import { vi, describe, afterEach } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

import AsideModal, { IAsideModalProps } from './AsideModal'

const props: IAsideModalProps = {
  title: 'Test Title',
  open: true,
  onClose: vi.fn(),
  position: 'right',
  disableEscapeKeyDown: false,
  children: <div>Test Content</div>
}

const renderComponent = () => {
  return render(<AsideModal {...props} />)
}

describe('AsideModal', () => {
  afterEach(cleanup)

  it('should be render with props', () => {
    const { getByRole, getByText } = renderComponent()

    expect(getByRole('aside-modal')).toBeDefined()
    expect(getByText('Test Title')).toBeDefined()
    expect(getByText('Test Content')).toBeDefined()
  })

  it('should calls onClose callback when close button is clicked', () => {
    const { getByRole } = renderComponent()

    const btnClose = getByRole('btn-close')
    fireEvent.click(btnClose)

    expect(props.onClose).toHaveBeenCalled()
  })

  it('should be render with differents positions', () => {
    const { getByRole, rerender } = renderComponent()
    const asideModal = getByRole('aside-modal')

    expect(asideModal.className).toContain('right-0')

    props.position = 'left'
    rerender(<AsideModal {...props} />)

    expect(asideModal.className).toContain('left-0')
  })
})
