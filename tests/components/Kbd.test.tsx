import React from 'react'
import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'
import { Kbd } from '../../src/components'

const kbds = ['Ctrl', 'Shift', 'R']

describe('Kbd component', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Kbd kbds={kbds} separator="+" />)
    })

    afterEach(() => {
        cleanup()
    })

    it('can be render', () => {
        expect(renderResult.container).toBeDefined()
    })

    it('all kbds are correct', () => {
        kbds.forEach((kbdName) => {
            expect(renderResult.getByText(kbdName)).toBeDefined()
        })
    })

    it('the separator renders and works correctly if we change it', () => {
        expect(renderResult.getAllByText('+')).toHaveLength(2)
        renderResult.rerender(<Kbd kbds={kbds} separator="-" />)

        expect(renderResult.getAllByText('-')).toHaveLength(2)
    })

    it('kbd have the HTML kbd tag', () => {
        const kbdItems: Array<string | unknown> = []
        kbds.find((kdName) => {
            expect(renderResult.getByText(kdName).nodeName).toBe('KBD')
            kbdItems.push(renderResult.getByText(kdName).nodeName)
        })

        expect(kbdItems).toHaveLength(3)
    })
})
