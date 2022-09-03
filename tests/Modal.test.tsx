import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import Modal from '../src/components/Modal'

describe('Modal component', () => {
    const setCloseModal = vi.fn()
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Modal active={false} setCloseModal={setCloseModal} />)
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
        renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} width="50%" height="30%" />)
        const modal = renderResult.getByTestId('modal-contain')
        expect(modal.style.width).toBe('50%')
        expect(modal.style.height).toBe('30%')
    })

    it('close modal if press esc key', () => {
        renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} />)
        const modal = renderResult.getByRole('modal-custom')
        fireEvent.keyUp(modal, { key: 'Escape' })
        expect(renderResult.container.firstChild).toBeNull()
    })

    it('close modal when click the button(x)', () => {
        renderResult.rerender(<Modal active={true} setCloseModal={setCloseModal} />)
        const btnCancel = renderResult.getByRole('btn-close')
        fireEvent.click(btnCancel)
        expect(renderResult.container.firstChild).toBeNull()
    })
})
