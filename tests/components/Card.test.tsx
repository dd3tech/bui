import React from 'react'
import { it, describe, expect } from 'vitest'
import { render } from '@testing-library/react'

import { Card } from '../../src/components'

describe('<Card/>', () => {
    it('should be render', () => {
        const { container } = render(<Card />)
        expect(container.firstChild).toBeDefined()
    })

    it('should be render with a children', () => {
        const { container } = render(
            <Card>
                <p>Hello World</p>
            </Card>
        )
        expect(container.firstChild).toBeDefined()
    })

    it('props height and width work correctly', () => {
        const { getByTestId } = render(<Card width={300} height={200} />)
        const card = getByTestId('card-contain')
        expect(card.style.width).toBe('300px')
        expect(card.style.height).toBe('200px')
    })

    describe('prop: rounded', () => {
        it('by default should be a render with a none rounded', () => {
            const { getByTestId } = render(<Card />)
            expect(getByTestId('card-contain').className).toContain('rounded-none')
        })

        it('should be render with a custom rounded', () => {
            const { getByTestId } = render(<Card rounded="xl" />)
            expect(getByTestId('card-contain').className).toContain('rounded-xl')
        })
    })

    describe('props: padding', () => {
        it('if we do not pass the padding it should render one by default', () => {
            const { getByTestId } = render(<Card />)
            expect(getByTestId('card-contain').className).toContain('p-4')
        })

        it('should be render with a custom padding', () => {
            const { getByTestId } = render(<Card padding={8} />)
            expect(getByTestId('card-contain').className).toContain('p-8')
        })

        it('should be render with a custom paddingX', () => {
            const { getByTestId } = render(<Card paddingX={5} />)
            expect(getByTestId('card-contain').className).toContain('px-5')
        })

        it('should be render with a custom paddingY', () => {
            const { getByTestId } = render(<Card paddingY={7} />)
            expect(getByTestId('card-contain').className).toContain('py-7')
        })

        it('should be render with custom paddingY and paddingX', () => {
            const { getByTestId } = render(<Card paddingY={6} paddingX={4} />)
            const card = getByTestId('card-contain')

            expect(card.className).toContain('py-6')
            expect(card.className).toContain('px-4')
        })
    })
})
