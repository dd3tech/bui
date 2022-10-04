import React from 'react'
import { describe, expect, it } from 'vitest'
import { RenderResult, render, cleanup } from '@testing-library/react'
import { Circle } from '../../src/components'

const propsCircle = {
    children: 'Circle component',
    width: '100px',
    height: '100px',
    useBackground: false,
    disabled: false
}

describe('Cricle component', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Circle {...propsCircle} />)
    })

    afterEach(() => {
        cleanup()
    })

    it('can be render', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('its props are applied correctly', () => {
        const circle = renderResult.container.firstChild as HTMLDivElement
        expect(circle.style.width).toBe('100px')
        expect(circle.style.height).toBe('100px')
        expect(circle.className).toContain('rounded-full')
        expect(circle.textContent).toBe('Circle component')
    })

    it('disabled works correctly', () => {
        renderResult.rerender(<Circle {...propsCircle} disabled />)
        const circle = renderResult.container.firstChild as HTMLDivElement
        expect(circle.className).toContain('text-gray-300')
        expect(circle.className).toContain('border-gray-300')
        expect(circle.className).toContain('bg-white')
        expect(circle.className).toContain('border')
    })
})
