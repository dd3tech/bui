import React from 'react'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { ProgressBar } from '../../src/components'

describe('Component UI: ProgressBar', () => {
    it('ProgressBar is working', () => {
        render(<ProgressBar />)
        expect(screen.getByRole('progressbar')).toBeDefined()
    })

    it('ProgressBar value is working', () => {
        render(<ProgressBar value={60} />)
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar.style.width).toBe('60%')
    })

    it('ProgressBar background color prop is working...', () => {
        render(<ProgressBar value={60} backgroundColor="blue" />)
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar.style.backgroundColor).toBe('blue')
    })

    it('ProgressBar animate prop is working...', () => {
        render(<ProgressBar animated />)
        const progressBar = screen.getByRole('progressbar')
        expect(progressBar.className).toContain('progress-bar-animated')
    })
})
