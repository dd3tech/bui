import React from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { Circle, Text } from '../../src/components'

describe('<Circle/>', () => {
    it('should be render', () => {
        const { container } = render(<Circle />)
        expect(container).toBeDefined()
    })

    it('by default should have a rounded full', () => {
        const { container } = render(<Circle />)
        const circle = container.firstChild as HTMLDivElement
        expect(circle.className).toContain('rounded-full')
    })

    it('should be render with a children', () => {
        const { container } = render(<Circle children={'Circle component'} />)
        const circle = container.firstChild as HTMLDivElement
        expect(circle.textContent).toBe('Circle component')
    })

    it('should also accept a children of type JSX', () => {
        const { container } = render(<Circle children={<Text role="text-children-jsx">Children JSX</Text>} />)
        const children = container?.firstChild?.firstChild as HTMLDivElement

        expect(children.getAttribute('role')).toBe('text-children-jsx')
        expect(children.textContent).toBe('Children JSX')
    })

    describe('prop: width & height', () => {
        it('if we pass a custom width it should apply it', () => {
            const { container } = render(<Circle width="300px" />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.style.width).toBe('300px')
        })

        it('if we dont pass a width it sets one by default', () => {
            const { container } = render(<Circle />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.style.width).toBe('3rem')
        })

        it('if we pass a custom height it should apply it', () => {
            const { container } = render(<Circle height="300px" />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.style.height).toBe('300px')
        })

        it('if we dont pass a height it sets one by default', () => {
            const { container } = render(<Circle />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.style.height).toBe('3rem')
        })
    })

    describe('props: backgroundColor & useBackground', () => {
        it('if a backgroundColor is not passed, one should be set by default', () => {
            const { container } = render(<Circle />)
            const circle = container.firstChild as HTMLDivElement

            expect(circle).toHaveStyle({
                backgroundColor: '#EFF6FF'
            })
        })

        it('if it is passed a backgroundColor it should apply it', () => {
            const { container } = render(<Circle backgroundColor="#DD32S" />)
            const circle = container.firstChild as HTMLDivElement

            expect(circle).toHaveStyle({
                backgroundColor: '#DD32S'
            })
        })

        it('setting useBackground to false should not render any backgroundColor', () => {
            const { container } = render(<Circle backgroundColor="#DD32S" useBackground={false} />)
            const circle = container.firstChild as HTMLDivElement

            expect(circle.style.backgroundColor).toBe('')
        })
    })

    describe('prop: disabled', () => {
        it('by default disabled should be false', () => {
            const { container } = render(<Circle />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.className).not.toContain('text-gray-300')
            expect(circle.className).not.toContain('border-gray-300')
            expect(circle.className).not.toContain('bg-white')
            expect(circle.className).not.toContain('border')
        })

        it('if it is disabled it should be disabled and change to gray color', () => {
            const { container } = render(<Circle disabled />)
            const circle = container.firstChild as HTMLDivElement
            expect(circle.className).toContain('text-gray-300')
            expect(circle.className).toContain('border-gray-300')
            expect(circle.className).toContain('bg-white')
            expect(circle.className).toContain('border')
        })
    })
})
