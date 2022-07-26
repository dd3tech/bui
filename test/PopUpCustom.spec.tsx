import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PopUpCustom } from '../src/components'

describe('Component UI: PupUpCustom', () => {
    const setClosePopUp = vi.fn()

    it('PopUpCustom is working', () => {
        render(<PopUpCustom active={false} setClosePopUp={setClosePopUp} />)
        expect(screen.getByRole('popup-custom')).toBeDefined()
    })

    it('PopUpCustom, pass the children is working', () => {
        render(
            <PopUpCustom active={true} setClosePopUp={setClosePopUp}>
                <h1>Children</h1>
            </PopUpCustom>
        )
        expect(screen.getByText('Children')).toBeDefined()
    })

    it('PopUpCustom not active is working', () => {
        render(<PopUpCustom active={false} setClosePopUp={setClosePopUp} />)
        const popup = screen.getByRole('popup-custom')
        expect(popup.className).toContain('hidden')
    })

    it('PopUpCustom active is working', () => {
        render(<PopUpCustom active={true} setClosePopUp={setClosePopUp} />)
        const popup = screen.getByRole('popup-custom')
        expect(popup.className).toContain('fixed')
    })

    it('PopUpCustom, widht and height props is working', () => {
        render(<PopUpCustom active={true} setClosePopUp={setClosePopUp} width="50%" height="30%" />)
        const popup = screen.getByTestId('popup-contain')
        expect(popup.style.width).toBe('50%')
        expect(popup.style.height).toBe('30%')
    })

    it('PopUpCustom, if keyUp is escape, close popup', () => {
        render(<PopUpCustom active={true} setClosePopUp={setClosePopUp} />)
        const popup = screen.getByRole('popup-custom')
        fireEvent.keyUp(popup, { key: 'Escape' })
        expect(popup.className).toContain('hidden')
    })

    it('PopUpCustom, close this when click the button (X)', () => {
        render(<PopUpCustom active={true} setClosePopUp={setClosePopUp} />)
        const popup = screen.getByRole('popup-custom')
        const btnCancel = screen.getByRole('btn-close')
        fireEvent.click(btnCancel)
        expect(popup.className).toContain('hidden')
    })
})
