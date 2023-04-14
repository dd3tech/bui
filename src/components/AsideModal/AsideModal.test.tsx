import { vi, describe, afterEach } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

import AsideModal from './AsideModal'

const props = {
  title: 'Test Title',
  open: true,
  onClose: vi.fn(),
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
})
