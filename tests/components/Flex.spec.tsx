import React from 'react'
import { it, describe } from 'vitest'
import { render, RenderResult, screen } from '@testing-library/react'
import { Flex } from '../../src/components'

describe('Component UI: Flex', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<Flex>I'm a flex component</Flex>)
    })

    it('Flex component is working', () => {
        expect(renderResult.getByRole('flex')).toBeDefined()
    })
    it('Flex component children is render', () => {
        expect(renderResult.getByText("I'm a flex component")).toBeDefined()
    })
    it('Flex component has flex class', () => {
        expect(renderResult.getByRole('flex').classList.contains('flex')).toBeDefined()
    })
    it('Flex component props are working', () => {
        renderResult.rerender(<Flex className="bg-pink-400">I'm a flex component</Flex>)
        expect(renderResult.getByRole('flex').classList.contains('bg-pink-400')).toBeDefined()
    })
})
