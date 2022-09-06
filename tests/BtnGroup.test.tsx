import React from 'react'
import { ButtonGroup, ButtonGroupProps, Button } from '../src/components'
import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

type BtnGroupProps = Omit<ButtonGroupProps, 'children'>

const ContentBtnGroup = (props?: BtnGroupProps) => {
    return (
        <ButtonGroup {...props}>
            <Button variant="primary" className="w-32">
                1st button
            </Button>
            <Button variant="secondary" className="w-32">
                2nd button
            </Button>
            <Button variant="success" className="w-32">
                3rd button
            </Button>
        </ButtonGroup>
    )
}

describe('Breadcumbs component works properly', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<ContentBtnGroup />)
    })

    afterEach(cleanup)

    it('can render', () => {
        expect(renderResult.container).toBeDefined()
    })

    it('the buttons can be render', () => {
        expect(renderResult.getByText('1st button')).toBeDefined()
        expect(renderResult.getByText('2nd button')).toBeDefined()
        expect(renderResult.getByText('3rd button')).toBeDefined()
    })

    it('props are working', () => {
        const divGroup = renderResult.container.firstChild as HTMLElement
        // check the default props
        expect(divGroup?.className).toContain('flex flex-col')
        expect(divGroup?.className).toContain('justify-start')
        expect(divGroup?.style.gap).toBe('6px')
    })

    it('can be change the props', () => {
        renderResult.rerender(<ContentBtnGroup align="center" gap={8} orientation="horizontal" className="w-full" />)
        const divGroup = renderResult.container.firstChild as HTMLElement
        expect(divGroup?.className).toContain('w-full')
        expect(divGroup?.className).toContain('flex flex-row')
        expect(divGroup?.className).toContain('justify-center')
        expect(divGroup?.style.gap).toBe('8px')
    })
})
