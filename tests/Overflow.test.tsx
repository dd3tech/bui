import React from 'react'
import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Overflow, Text } from '../src/components'

describe('Component UI: Overflow', () => {
    it('Overflow is working', () => {
        render(
            <Overflow role="overflow">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toBeDefined()
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Overflow has overflow-auto class', () => {
        render(
            <Overflow role="overflow" overflow="auto">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toHaveClass('overflow-auto')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Overflow has overflow-scroll class', () => {
        render(
            <Overflow role="overflow" overflow="scroll">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toHaveClass('overflow-scroll')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Overflow has overflow-x-hidden class', () => {
        render(
            <Overflow role="overflow" overflow="x-hidden">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toHaveClass('overflow-x-hidden')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Overflow has overflow-y-visible class', () => {
        render(
            <Overflow role="overflow" overflow="y-visible">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toHaveClass('overflow-y-visible')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Overflow has default overflow-hidden class', () => {
        render(
            <Overflow role="overflow">
                <Text>{'Hello'}</Text>
            </Overflow>
        )
        expect(screen.getByRole('overflow')).toHaveClass('overflow-hidden')
        expect(screen.getByText('Hello')).toBeDefined()
    })
})
