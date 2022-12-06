import React from 'react'
import { it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Container from '../../src/components/Layout/Container'
import Text from '../../src/components/Typography'

const defaultProps = {
    role: 'container',
    children: <Text>{'Hello'}</Text>
}

describe('<Container/>: smooth', () => {
    it('should be render', () => {
        render(<Container {...defaultProps} />)
        expect(screen.getByRole('container')).toBeDefined()
    })
    it('should be render with a children', () => {
        render(<Container {...defaultProps} />)
        expect(screen.getByRole('container')).toBeDefined()
        expect(screen.getByText('Hello')).toBeDefined()
    })
    it('should have a container and mx-auto classes', () => {
        render(<Container {...defaultProps} />)
        expect(screen.getByRole('container')).toHaveClass('container')
        expect(screen.getByRole('container')).toHaveClass('mx-auto')
    })
    it('should have render with a custom className', () => {
        render(<Container {...defaultProps} className="test-class" />)
        expect(screen.getByRole('container')).toHaveClass('test-class')
    })
})

describe('prop: rounded', () => {
    it('should have a rounded type lg', () => {
        render(<Container {...defaultProps} rounded="lg" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-lg')
    })
    it('should have a rounded type sm', () => {
        render(<Container {...defaultProps} rounded="sm" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-sm')
    })
    it('should have a rounded type md', () => {
        render(<Container {...defaultProps} rounded="md" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-md')
    })
    it('should have a rounded type xl', () => {
        render(<Container {...defaultProps} rounded="xl" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-xl')
    })
    it('should have a rounded type 2xl', () => {
        render(<Container {...defaultProps} rounded="2xl" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-2xl')
    })
    it('should have a rounded type 2xl', () => {
        render(<Container {...defaultProps} rounded="3xl" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-3xl')
    })
    it('should have a rounded type full', () => {
        render(<Container {...defaultProps} rounded="full" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-full')
    })
    it('should have a rounded type rounded', () => {
        render(<Container {...defaultProps} rounded="rounded" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-rounded')
    })
    it('should have a rounded type none', () => {
        render(<Container {...defaultProps} rounded="none" />)
        expect(screen.getByRole('container')).toHaveClass('rounded-none')
    })
})

describe('prop: shadow', () => {
    it('should be able to render with a lg shadow', () => {
        render(<Container {...defaultProps} shadow="lg" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-lg')
    })
    it('should be able to render with a sm shadow', () => {
        render(<Container {...defaultProps} shadow="sm" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-sm')
    })
    it('should be able to render with a md shadow', () => {
        render(<Container {...defaultProps} shadow="md" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-md')
    })
    it('should be able to render with a xl shadow', () => {
        render(<Container {...defaultProps} shadow="xl" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-xl')
    })
    it('should be able to render with a 2xl shadow', () => {
        render(<Container {...defaultProps} shadow="2xl" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-2xl')
    })
    it('should be able to render with a inner shadow', () => {
        render(<Container {...defaultProps} shadow="inner" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-inner')
    })
    it('should be able to render with a none shadow', () => {
        render(<Container {...defaultProps} shadow="none" />)
        expect(screen.getByRole('container')).toHaveClass('shadow-none')
    })
})
