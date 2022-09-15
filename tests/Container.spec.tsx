import React from 'react'
import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container, Text } from '../src/components'

describe('Component UI: Container', () => {
    it('Container is working', () => {
        render(
            <Container role="container">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toBeDefined()
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has container and mx-auto classes', () => {
        render(
            <Container role="container">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toHaveClass('container')
        expect(screen.getByRole('container')).toHaveClass('mx-auto')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has shadow-sm', () => {
        render(
            <Container role="container" shadow="sm">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toHaveClass('shadow-sm')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has shadow-lg', () => {
        render(
            <Container role="container" shadow="lg">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toHaveClass('shadow-lg')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has rounded-sm', () => {
        render(
            <Container role="container" rounded="sm">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toHaveClass('rounded-sm')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has rounded-lg', () => {
        render(
            <Container role="container" rounded="lg">
                <Text>{'Hello'}</Text>
            </Container>
        )
        expect(screen.getByRole('container')).toHaveClass('rounded-lg')
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('Container has rounded-lg', () => {
        render(
            <Container role="container" rounded="lg">
                <Text role="text">{'Hello'}</Text>
            </Container>
        )
        const text = screen.getByRole('text')
        expect(screen.getByRole('container')).toContainElement(text)
        expect(screen.getByText('Hello')).toBeDefined()
    })
})
