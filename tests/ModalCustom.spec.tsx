import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, fireEvent, RenderResult } from '@testing-library/react'
import { ModalCustom } from '../src/components'

describe('Component UI: ModalCustom', () => {
    const setCloseModal = vi.fn()
    let renderResult: RenderResult

    beforeEach(() => {
        const result = render(<ModalCustom active={false} setCloseModal={setCloseModal} />)
        renderResult = result
    })

    it('ModalCustom is closed', () => {
        expect(renderResult.container.firstChild).toBeNull()
    })

    it('ModalCustom, pass the children is working', () => {
        renderResult.rerender(
            <ModalCustom active={true} setCloseModal={setCloseModal}>
                <h1>Children</h1>
            </ModalCustom>
        )

        expect(renderResult.getByText('Children')).toBeDefined()
    })

    it('ModalCustom active is working', () => {
        renderResult.rerender(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const modal = renderResult.getByRole('modal-custom')
        expect(modal.className).toContain('fixed')
    })

    it('ModalCustom, widht and height props is working', () => {
        renderResult.rerender(<ModalCustom active={true} setCloseModal={setCloseModal} width="50%" height="30%" />)
        const modal = renderResult.getByTestId('modal-contain')
        expect(modal.style.width).toBe('50%')
        expect(modal.style.height).toBe('30%')
    })

    it('ModalCustom, if keyUp is escape, close modal', () => {
        renderResult.rerender(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const modal = renderResult.getByRole('modal-custom')
        fireEvent.keyUp(modal, { key: 'Escape' })
        expect(renderResult.container.firstChild).toBeNull()
    })

    it('ModalCustom, close this when click the button (X)', () => {
        renderResult.rerender(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const btnCancel = renderResult.getByRole('btn-close')
        fireEvent.click(btnCancel)
        expect(renderResult.container.firstChild).toBeNull()
    })
})
