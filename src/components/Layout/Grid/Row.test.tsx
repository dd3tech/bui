import { it, describe } from 'vitest'
import { render, RenderResult } from '@testing-library/react'

import Row from './Row'

describe('<Row/>', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(
            <Row cols={1} sm={2} md={3} gap={5} className="mt-2">
                I'm a Row component
            </Row>
        )
    })

    it('Row component is working', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })
    it('Row component props are working', () => {
        const { className: rowClassName } = renderResult.container.firstChild as HTMLDivElement
        expect(rowClassName).toContain('mt-2')
        expect(rowClassName).toContain('grid-cols-1')
        expect(rowClassName).toContain('sm:grid-cols-2')
        expect(rowClassName).toContain('md:grid-cols-3')
        expect(rowClassName).toContain('gap-5')
    })
})
