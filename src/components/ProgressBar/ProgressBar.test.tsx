import { it, describe, expect } from 'vitest'
import { render } from '@testing-library/react'

import ProgressBar from './ProgressBar'

describe('<ProgressBar/>', () => {
    it('ProgressBar is working', () => {
        const { getByRole } = render(<ProgressBar />)
        expect(getByRole('progressbar')).toBeDefined()
    })

    it('ProgressBar value is working', () => {
        const { getByRole } = render(<ProgressBar value={60} />)
        const progressBar = getByRole('progressbar')
        expect(progressBar.style.width).toBe('60%')
    })

    it('ProgressBar background color prop is working...', () => {
        const { getByRole } = render(<ProgressBar value={60} backgroundColor="blue" />)
        const progressBar = getByRole('progressbar')
        expect(progressBar.style.backgroundColor).toBe('blue')
    })

    it('ProgressBar animate prop is working...', () => {
        const { getByRole } = render(<ProgressBar animated />)
        const progressBar = getByRole('progressbar')
        expect(progressBar.className).toContain('progress-bar-animated')
    })

    it('if the value is greater than 5 and the label property exists, it should be rendered with the text label', () => {
        const loadText = 'Loading...'
        const { getByText } = render(<ProgressBar value={7} label={loadText} />)
        expect(getByText(loadText)).toBeDefined()
    })
})
