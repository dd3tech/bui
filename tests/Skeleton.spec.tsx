import React from 'react'
import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '../src/components/Skeleton'

describe('Component UI: Skeleton', () => {
    it('Skeleton is working', () => {
        render(<Skeleton />)
        expect(screen.getByTestId('skeleton')).toBeDefined()
    })

    it('Skeleton prop style is working', () => {
        render(<Skeleton style={{ width: '50px' }} />)
        const skeleton: { firstChild: any } = screen.getByTestId('skeleton')
        expect(skeleton.firstChild.style?.width).toBe('50px')
    })

    it('Skeleton prop className is working', () => {
        render(<Skeleton className="skeletonExample" />)
        const skeleton: { firstChild: any } = screen.getByTestId('skeleton')
        expect(skeleton.firstChild.className).toContain('skeletonExample')
    })
})
