import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { it, describe, expect } from 'vitest'
import React from 'react'
import ToolTipHover from '../../src/components/ToolTipHover/ToolTipHover'

describe('Component ToolTipHover', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        const modalRoot = document.createElement('div')
        modalRoot.setAttribute('id', 'portal-root')
        document.body.appendChild(modalRoot)
        renderResult = render(<ToolTipHover children={'I am the children'} variantPopup={'blue'} element={'I am the element'} />)
    })

    afterEach(() => {
        cleanup()
    })

    it('container should be rendered', () => {
        expect(renderResult.getByRole('element-tooltip')).toBeDefined()
    })

    it('the tooltip element must be rendered', () => {
        expect(renderResult.getByRole('element-tooltip').textContent).toContain('I am the element')
    })

    it('the child of the tooltip must be rendered', () => {
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').textContent).toContain('I am the children')
    })

    it('if the variant is blue, the className must be rendered correctly', () => {
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('bg-white border-blue-700 p-2 text-slate-50')
    })

    it('if the variant is warning, the className must be rendered correctly', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'warning'} element={''} />)
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('ml-1 -mt-10 bg-white border-yellow-500 p-2 text-gray-500')
    })

    it('if the variant is gray, the className must be rendered correctly', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'gray'} element={''} />)
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('text-center -ml-2 -mt-14 bg-gray-500 py-2 px-4 text-white')
    })

    it('if the variant is dark, the className must be rendered correctly', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'dark'} element={''} />)
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('text-center -ml-11 -mt-10 bg-gray-900 opacity-80 py-2 px-4 text-white')
    })

    it('if passed through props the className of the children should be rendered correctly', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'blue'} element={''} className="bg-red-600" />)
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('bg-red-600')
    })

    it('if it is passed through props align it should render correctly in the className of the children', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'blue'} element={''} align={'mt-12'} />)
        fireEvent.mouseEnter(renderResult.getByRole('element-tooltip'))
        expect(renderResult.getByRole('children-tooltip').className).toContain('mt-12')
    })

    it('if passed through props styleElement it should render correctly in the style of the element', () => {
        renderResult.rerender(<ToolTipHover children={''} variantPopup={'blue'} element={''} styleElement={{ backgroundColor: 'red' }} />)
        expect(renderResult.getByRole('element-tooltip').style.backgroundColor).toContain('red')
    })
})
