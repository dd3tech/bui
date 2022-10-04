import React from 'react'
import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../../src/components'

describe('Component UI: Button', () => {
    it('Button Primary is working', () => {
        render(<Button>Click me!</Button>)
        expect(screen.getByRole('button')).toBeDefined()
    })

    it('Button is disabled', () => {
        render(<Button disabled>Click me!</Button>)
        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('Button is not disabled', () => {
        render(<Button variant="disabled">Click me!</Button>)
        expect(screen.getByRole('button')).not.toBeDisabled()
    })
})
