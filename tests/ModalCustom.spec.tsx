import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ModalCustom } from '../src/components'

describe('Component UI: ModalCustom', () => {
    const setCloseModal = vi.fn()

    it('ModalCustom is working', () => {
        render(<ModalCustom active={false} setCloseModal={setCloseModal} />)
        expect(screen.getByRole('popup-custom')).toBeDefined()
    })

    it('ModalCustom, pass the children is working', () => {
        render(
            <ModalCustom active={true} setCloseModal={setCloseModal}>
                <h1>Children</h1>
            </ModalCustom>
        )
        expect(screen.getByText('Children')).toBeDefined()
    })

    it('ModalCustom not active is working', () => {
        render(<ModalCustom active={false} setCloseModal={setCloseModal} />)
        const popup = screen.getByRole('modal-custom')
        expect(popup.className).toContain('hidden')
    })

    it('ModalCustom active is working', () => {
        render(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const popup = screen.getByRole('modal-custom')
        expect(popup.className).toContain('fixed')
    })

    it('ModalCustom, widht and height props is working', () => {
        render(<ModalCustom active={true} setCloseModal={setCloseModal} width="50%" height="30%" />)
        const popup = screen.getByTestId('modal-contain')
        expect(popup.style.width).toBe('50%')
        expect(popup.style.height).toBe('30%')
    })

    it('ModalCustom, if keyUp is escape, close popup', () => {
        render(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const popup = screen.getByRole('modal-custom')
        fireEvent.keyUp(popup, { key: 'Escape' })
        expect(popup.className).toContain('hidden')
    })

    it('ModalCustom, close this when click the button (X)', () => {
        render(<ModalCustom active={true} setCloseModal={setCloseModal} />)
        const popup = screen.getByRole('modal-custom')
        const btnCancel = screen.getByRole('btn-close')
        fireEvent.click(btnCancel)
        expect(popup.className).toContain('hidden')
    })
})
