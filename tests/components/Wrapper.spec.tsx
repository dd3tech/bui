import React from 'react'
import { it, describe } from 'vitest'
import { render, RenderResult } from '@testing-library/react'
import { Wrapper } from '../../src/components'

describe('Component UI: Wrapper', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(
            <Wrapper className="bg-blue-500" paddingVertical={5} paddingHorizontal={10} maxWidth="full" hasViewportHeight style={{ padding: '8px' }}>
                <span>This is a Wrapper</span>
            </Wrapper>
        )
    })
    it('Wrapper component is working', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })
    it('Wrapper component is render children', () => {
        expect(renderResult.getByText('This is a Wrapper')).toBeDefined()
    })
    it('Wrapper component props are working', () => {
        const { className: wrapperClassName, style: wrapperStyle } = renderResult.container.firstChild as HTMLDivElement
        expect(wrapperClassName).toContain('bg-blue-500')
        expect(wrapperClassName).toContain('py-5')
        expect(wrapperClassName).toContain('px-10')
        expect(wrapperClassName).toContain('max-w-full')
        expect(wrapperStyle.padding).toBe('8px')
        expect(wrapperStyle.minHeight).toBe('calc(100vh - 193px)')
    })
    it('Wrapper component default props are working', () => {
        renderResult.rerender(
            <Wrapper>
                <span>This is a Wrapper</span>
            </Wrapper>
        )
        const { className: wrapperClassName, style: wrapperStyle } = renderResult.container.firstChild as HTMLDivElement
        expect(wrapperClassName).toContain('py-10 max-w-screen-2xl px-20 mx-auto')
        expect(wrapperStyle.minHeight).toBe('')
    })
})
