import React from 'react'
import { it, describe } from 'vitest'
import { render, waitFor, cleanup } from '@testing-library/react'
import { Badge } from '../../src/components'

const badgeContainer = (getByRole) => {
    return getByRole('container-badge')
}

describe('Component UI: Badge', () => {
    afterEach(() => {
        cleanup()
    })

    it('Badge contains the className corresponding to the warning variant', () => {
        const { getByRole } = render(<Badge variant="warning" icon="success" />)
        expect(badgeContainer(getByRole).className).toContain('bg-yellow-100 border border-yellow-500 text-gray-500')
    })

    it('Badge contains the className corresponding to the infoPrimary variant ', () => {
        const { getByRole } = render(<Badge variant="infoPrimary" />)
        expect(badgeContainer(getByRole).className).toContain('bg-blue-50 border border-blue-300 text-gray-500')
    })

    it('Badge contains the className corresponding to the infoSecondary variant ', () => {
        const { getByRole } = render(<Badge variant="infoSecondary" />)
        expect(badgeContainer(getByRole).className).toContain('bg-transparent border border-blue-300 text-gray-500')
    })

    it('Badge contains the className corresponding to the success variant ', () => {
        const { getByRole } = render(<Badge variant="success" />)
        expect(badgeContainer(getByRole).className).toContain('bg-green-50 border border-green-300 text-gray-500 font-medium')
    })

    it('Badge contains the className corresponding to the primary variant ', () => {
        const { getByRole } = render(<Badge variant="primary" />)
        expect(badgeContainer(getByRole).className).toContain('bg-transparent border border-blue-700 text-blue-700')
    })

    it('Badge contains the className corresponding to the secondary variant ', () => {
        const { getByRole } = render(<Badge variant="secondary" />)
        expect(badgeContainer(getByRole).className).toContain('bg-transparent border border-white text-white hover:bg-gray-50 hover:text-black')
    })

    it('Badge contains the className corresponding to the error variant and the props text works correctly  ', () => {
        const { getByRole } = render(<Badge variant="error" text="Testing" />)
        expect(badgeContainer(getByRole).className).toContain('bg-red-50 border border-red-300 text-gray-500 font-medium')
        expect(badgeContainer(getByRole).textContent).contain('Testing')
    })

    it('Badge, the props icon works correctly ', async () => {
        const { container, rerender } = render(<Badge variant="success" />)
        expect(container.querySelector(`[id=success]`)).toBeDefined()
        rerender(<Badge variant="primary" icon="tag" />)
        waitFor(() => {
            expect(container.querySelector(`[id=success]`)).toBeUndefined()
        })
        expect(container.querySelector(`[id=tag]`)).toBeDefined()
    })

    it('Badge, the props className works correctly ', () => {
        const { getByRole } = render(<Badge variant="primary" icon="tag" className="text-red-600" />)
        expect(badgeContainer(getByRole).className).toContain('text-red-600')
    })

    it('Badge, the props classNameIcon works correctly ', () => {
        const { getByRole } = render(<Badge variant="primary" icon="tag" classNameIcon="text-red-600" />)
        expect(badgeContainer(getByRole).firstChild.getAttribute('class')).toBe('text-red-600')
    })
})
