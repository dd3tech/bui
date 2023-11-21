import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent, RenderResult } from '@testing-library/react'

import Modal from './Modal'

describe('<Modal/>', () => {
  const setCloseModal = vi.fn()
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(
      <Modal active={false} setCloseModal={setCloseModal} />
    )
  })

  it('the modal is closed', () => {
    expect(renderResult.container.firstChild).toBeNull()
  })

  it('modal, pass the children is working', () => {
    renderResult.rerender(
      <Modal active={true} setCloseModal={setCloseModal}>
        <h1>Children</h1>
      </Modal>
    )
    expect(renderResult.container.firstChild).toBeDefined()
  })

  it('the modal is open', () => {
    renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} />)
    const modal = renderResult.getByRole('modal-custom')
    expect(modal.className).toContain('fixed')
  })

  it('modal widht and height props is working', () => {
    renderResult.rerender(
      <Modal
        active={true}
        setCloseModal={setCloseModal}
        width="50%"
        height="30%"
      />
    )
    const modal = renderResult.getByTestId('modal-content')
    expect(modal.style.width).toBe('50%')
    expect(modal.style.height).toBe('30%')
  })

  it('close modal if press esc key', () => {
    renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} />)
    const modal = renderResult.getByRole('modal-custom')
    fireEvent.keyDown(modal, { key: 'Escape' })
    expect(renderResult.container.firstChild).toBeNull()
  })

  it('close modal when click the button(x)', () => {
    renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} />)
    const btnCancel = renderResult.getByRole('btn-close')
    fireEvent.click(btnCancel)
    expect(renderResult.container.firstChild).toBeNull()
  })

  it('should not render the button(x)', () => {
    const renderResult = render(
      <Modal active={true} setCloseModal={setCloseModal} btnClose={false} />
    )
    const btnCancel = renderResult.queryByRole('btn-close')
    expect(btnCancel).toBeNull()
  })

  it('when passing the blur prop the modal must have the class "blur"', () => {
    renderResult.rerender(
      <Modal active={true} setCloseModal={setCloseModal} blur />
    )

    const modal = renderResult.getByRole('modal-custom')
    expect(modal.className).toContain('blur')
  })

  it('when passing the preventClose prop when clicking outside the modal it does not close.', () => {
    renderResult.rerender(
      <div role="modal-container">
        <Modal active={true} setCloseModal={setCloseModal} preventClose />
      </div>
    )

    const containerModal = renderResult.getByRole('modal-container')
    fireEvent.click(containerModal)
    expect(containerModal.children).toBeDefined()
  })

  it('when passing the prop fullScreen the width and height of the modal container must be "100%".', () => {
    renderResult.rerender(
      <Modal active={true} setCloseModal={setCloseModal} fullScreen />
    )

    const modalContain = renderResult.getByTestId('modal-content')
    expect(modalContain.style.width).toEqual('100%')
    expect(modalContain.style.height).toEqual('100%')
  })
})
