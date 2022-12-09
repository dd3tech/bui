import React from 'react'
import { it, describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Switch } from '../../src/components'

describe('Component Switch', () => {
    const setToggle = vi.fn()

    it('Switch is working', () => {
        render(<Switch toggle={false} setToggle={setToggle} text="Example" />)
        expect(screen.getByTestId('switch-toggle')).toBeDefined()
    })

    it('Switch render text', () => {
        render(<Switch toggle={false} setToggle={setToggle} text="Example" />)
        expect(screen.getByText('Example')).toBeDefined()
    })
})
