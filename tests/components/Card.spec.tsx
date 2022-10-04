import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, RenderResult, cleanup } from '@testing-library/react'
import { Card, ICardProps } from '../../src/components'

const cardProps: ICardProps = {
    width: 250,
    paddingX: 4,
    paddingY: 4,
    rounded: 'lg'
}

describe('Card component', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Card {...cardProps} />)
    })

    afterEach(() => {
        cleanup()
    })

    it('can be render', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('Card component, pass the children is working', () => {
        renderResult.rerender(
            <Card>
                <p>Hello World</p>
            </Card>
        )
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('Card rounded and padding props is working', () => {
        renderResult.rerender(<Card padding={4} rounded="2x" />)
        const card = renderResult.getByTestId('card-contain')
        expect(card.className).toContain('rounded-2x')
        expect(card.className).toContain('p-4')
    })

    it('Card width and height props is working', () => {
        renderResult.rerender(<Card width={300} height={200} />)
        const card = renderResult.getByTestId('card-contain')
        expect(card.style.width).toBe('300px')
        expect(card.style.height).toBe('200px')
    })
})
