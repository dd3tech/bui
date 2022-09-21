import React from 'react'
import { it, describe } from 'vitest'
import { render, RenderResult } from '@testing-library/react'
import { Spinner } from '../src/components'

describe('Component UI: Spinner', () => {
    let renderResult: RenderResult
    let spinnerStyle: CSSStyleDeclaration

    beforeEach(() => {
        renderResult = render(<Spinner border={10} height={'8rem'} width={'8rem'} color={'#2d265d'} />)
        const { style } = renderResult.getByRole('spinner').firstChild as HTMLDivElement
        spinnerStyle = style
    })
    it('Spinner component is working', () => {
        expect(renderResult.getByRole('spinner')).toBeDefined()
    })
    it('Spinner component props are working', () => {
        expect(spinnerStyle.borderTopColor).toBe('#2d265d')
        expect(spinnerStyle.width).toBe('8rem')
        expect(spinnerStyle.height).toBe('8rem')
        expect(spinnerStyle.borderWidth).toBe('10px')
    })
    it('Spinner component default props are working', () => {
        renderResult.rerender(<Spinner />)
        expect(spinnerStyle.borderTopColor).toBe('#1d4ed8')
        expect(spinnerStyle.width).toBe('2rem')
        expect(spinnerStyle.height).toBe('2rem')
        expect(spinnerStyle.borderWidth).toBe('4px')
    })
    it('Spinner component pageLoader is working', () => {
        renderResult.rerender(<Spinner pageLoader />)
        expect(spinnerStyle.width).toBe('8rem')
        expect(spinnerStyle.height).toBe('8rem')
        expect(spinnerStyle.borderWidth).toBe('8px')
    })
    it('Spinner component pageLoader overrides width, height and border', () => {
        renderResult.rerender(<Spinner pageLoader border={15} height={'3rem'} width={'3rem'} />)
        expect(spinnerStyle.width).toBe('8rem')
        expect(spinnerStyle.height).toBe('8rem')
        expect(spinnerStyle.borderWidth).toBe('8px')
    })
    it('Spinner component color is working', () => {
        renderResult.rerender(<Spinner color={'#2d265d'} />)
        expect(spinnerStyle.borderTopColor).toBe('#2d265d')
    })
    it('Spinner component color is working', () => {
        renderResult.rerender(<Spinner color={'#2d265d'} />)
        expect(spinnerStyle.borderTopColor).toBe('#2d265d')
    })
    it('Spinner component width is working', () => {
        renderResult.rerender(<Spinner width={'10rem'} />)
        expect(spinnerStyle.width).toBe('10rem')
    })
    it('Spinner component height is working', () => {
        renderResult.rerender(<Spinner height={'10rem'} />)
        expect(spinnerStyle.height).toBe('10rem')
    })
})
