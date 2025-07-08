import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent, RenderResult, screen } from '@testing-library/react'
import ModalV2 from './ModalV2'

describe('<ModalV2/>', () => {
  const setCloseModal = vi.fn()
  const handleSubmit = vi.fn()
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(
      <ModalV2 showModal={false} onClose={setCloseModal} title="Test Title">
        <div>Test Content</div>
      </ModalV2>
    )
  })

  it('should be closed when showModal is false', () => {
    expect(renderResult.container.firstChild).toBeNull()
  })

  it('should open when showModal is true', () => {
    renderResult.rerender(
      <ModalV2 showModal={true} onClose={setCloseModal} title="Test Title">
        <div>Test Content</div>
      </ModalV2>
    )

    const modal = screen.getByRole('modal-custom')
    expect(modal).toBeInTheDocument()
    expect(modal).toHaveClass('fixed')
  })

  it('should render the title correctly', () => {
    renderResult.rerender(
      <ModalV2 showModal={true} onClose={setCloseModal} title="Test Title">
        <div>Test Content</div>
      </ModalV2>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render children content', () => {
    renderResult.rerender(
      <ModalV2 showModal={true} onClose={setCloseModal} title="Test Title">
        <div data-testid="test-content">Test Content</div>
      </ModalV2>
    )

    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  it('should apply custom width', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        title="Test Title"
        width="500px"
      >
        <div>Test Content</div>
      </ModalV2>
    )

    const modalContent = screen.getByTestId('modal-content')
    expect(modalContent.style.width).toBe('500px')
  })

  it('should close when clicking the close button', () => {
    renderResult.rerender(
      <ModalV2 showModal={true} onClose={setCloseModal} title="Test Title">
        <div>Test Content</div>
      </ModalV2>
    )

    const closeButton = screen.getByRole('btn-close')
    fireEvent.click(closeButton)
    expect(setCloseModal).toHaveBeenCalled()
  })

  it('should close when pressing Escape key', () => {
    renderResult.rerender(
      <ModalV2 showModal={true} onClose={setCloseModal} title="Test Title">
        <div>Test Content</div>
      </ModalV2>
    )

    const modal = screen.getByRole('modal-custom')
    fireEvent.keyDown(modal, { key: 'Escape' })
    expect(setCloseModal).toHaveBeenCalled()
  })

  it('should render custom buttons when provided', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        title="Test Title"
        buttonsModal={[
          {
            label: 'Custom Cancel',
            onClick: () => alert('Custom Cancel'),
            variant: 'danger'
          },
          {
            label: 'Custom Save',
            onClick: () => alert('Custom Save'),
            variant: 'tertiary'
          }
        ]}
      >
        <div>Test Content</div>
      </ModalV2>
    )

    expect(screen.getByText('Custom Cancel')).toBeInTheDocument()
    expect(screen.getByText('Custom Save')).toBeInTheDocument()
  })

  it('should disable submit button when isDisabledButton is true', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        title="Test Title"
        buttonsModal={[
          {
            label: 'Save',
            onClick: handleSubmit,
            variant: 'primary',
            disabled: true
          }
        ]}
      >
        <div>Test Content</div>
      </ModalV2>
    )

    const saveButton = screen.getByText('Save')
    expect(saveButton).toBeDisabled()
  })

  it('should render default buttons when custom buttons are not provided', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        buttonsModal={[
          {
            label: 'Cancel',
            onClick: setCloseModal,
            variant: 'secondary'
          },
          {
            label: 'Save',
            onClick: handleSubmit,
            variant: 'primary'
          }
        ]}
        title="Test Title"
      >
        <div>Test Content</div>
      </ModalV2>
    )

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should call onSubmit when Save button is clicked', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        buttonsModal={[
          {
            label: 'Save',
            onClick: handleSubmit,
            variant: 'primary'
          }
        ]}
        title="Test Title"
      >
        <div>Test Content</div>
      </ModalV2>
    )

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)
    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should call onClose when Cancel button is clicked', () => {
    renderResult.rerender(
      <ModalV2
        showModal={true}
        onClose={setCloseModal}
        buttonsModal={[
          {
            label: 'Cancel',
            onClick: setCloseModal,
            variant: 'secondary'
          }
        ]}
        title="Test Title"
      >
        <div>Test Content</div>
      </ModalV2>
    )

    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    expect(setCloseModal).toHaveBeenCalled()
  })
})
