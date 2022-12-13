import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import Kbd from './Kbd'

const kbds = ['Ctrl', 'Shift', 'R']

describe('<Kbd/>', () => {
    it('should be render', () => {
        const { container } = render(<Kbd kbds={kbds} separator="+" />)
        expect(container).toBeDefined()
    })

    describe('prop: kbds', () => {
        let kbdRenderResult: RenderResult

        beforeEach(() => {
            kbdRenderResult = render(<Kbd kbds={kbds} separator="+" />)
        })

        afterEach(() => {
            cleanup()
        })

        it('the kbds should be rendered', () => {
            kbds.forEach((kbdName) => {
                expect(kbdRenderResult.getByText(kbdName)).toBeDefined()
            })
        })

        it('all kbds should be wrapped by an HTML element', () => {
            const kbdItems: Array<string | unknown> = []
            kbds.find((kdName) => {
                expect(kbdRenderResult.getByText(kdName).nodeName).toBe('KBD')
                kbdItems.push(kbdRenderResult.getByText(kdName).nodeName)
            })
            expect(kbdItems).toHaveLength(3)
        })
    })

    describe('prop: separator', () => {
        it('the separator renders and works correctly if we change it', () => {
            const kbd = render(<Kbd kbds={kbds} separator="&" />)
            expect(kbd.getAllByText('&')).toHaveLength(2)

            kbd.rerender(<Kbd kbds={kbds} separator="-" />)
            expect(kbd.getAllByText('-')).toHaveLength(2)
        })

        it('if no separator is passed, it should have one by default', () => {
            const kbd = render(<Kbd kbds={['1st', '2nd']} />)
            expect(kbd.getByText('+')).toBeDefined()
        })

        it('if the kbd is the last one, the separator should not be show', () => {
            const kbd = render(<Kbd kbds={kbds} separator=">" />)
            kbds.forEach((k, i) => {
                const element = kbd.getByText(k)
                if (kbds.length - 1 === i) {
                    expect(element.nextSibling?.textContent).not.toContain('>')
                    return
                }
                expect(element.nextElementSibling?.textContent).toContain('>')
            })
        })
    })
})
