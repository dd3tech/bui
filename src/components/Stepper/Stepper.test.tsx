import { describe, it } from 'vitest'
import { cleanup, render, RenderResult } from '@testing-library/react'

import Stepper from './Stepper'

const defaultProps = {
    phase: 1,
    totalPhases: 4,
    width: '150px',
    height: '150px',
    fontSize: '1rem',
    textColor: '#1d4ed8'
}

describe('<Stepper/>', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Stepper {...defaultProps} />)
    })

    afterEach(() => cleanup())

    it('can be render', () => {
        expect(renderResult.container.firstChild).toBeDefined()
    })

    it('the component is working properly', () => {
        const circularProgressBar = renderResult.getByText('1/4')
        expect(circularProgressBar.style.fill).toBe('#1d4ed8')
        expect(circularProgressBar.getAttribute('x')).toBe('50')
        expect(circularProgressBar.getAttribute('y')).toBe('50')
    })

    it('works correctly when the default props are changed', () => {
        const newProps = { ...defaultProps, phase: 4, totalPhases: 8, textColor: 'white' }
        renderResult.rerender(<Stepper {...newProps} />)
        const circularProgressBar = renderResult.getByText('4/8')
        const { style: styleContainer } = renderResult.container.firstChild as HTMLDivElement
        expect(circularProgressBar).toBeDefined()
        expect(styleContainer.width).toBe('150px')
        expect(styleContainer.height).toBe('150px')
        expect(circularProgressBar.style.fill).toBe('white')
    })
})
