import { it, describe } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import DynamicHeroIcon from './DynamicHeroIcon'

describe('<DynamicHeroicon/>', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<DynamicHeroIcon icon="HomeIcon" />)
    })

    afterEach(() => {
        cleanup()
    })

    it('can be render', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('the same element that I want to render and that contains an svg inside is rendered.', () => {
        const svg = renderResult.container.querySelector(`[id=HomeIcon]`)
        expect(svg).toBeDefined()
        expect(svg?.nodeName).toBe('svg')
    })

    it('we can render different icons', () => {
        expect(renderResult.container.querySelector(`[id=HomeIcon]`)).not.toBeNull()
        renderResult.rerender(<DynamicHeroIcon icon="ArchiveIcon" />)
        expect(renderResult.container.querySelector(`[id=HomeIcon]`)).toBeNull()
        expect(renderResult.container.querySelector(`[id=ArchiveIcon]`)).not.toBeNull()
    })

    it('we can change the color and also the size', () => {
        renderResult.rerender(<DynamicHeroIcon icon="AcademicCapIcon" className="text-blue-700" width={10} height={10} />)
        const icon = renderResult.container.querySelector(`[id=AcademicCapIcon]`)
        expect(icon).not.toBeNull()
        expect(icon?.getAttribute('width')).toBe('10')
        expect(icon?.getAttribute('height')).toBe('10')
        expect(icon?.getAttribute('class')).toContain('text-blue-700')
    })
})
