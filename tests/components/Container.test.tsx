import React from 'react'
import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { Text, Container } from '../../src/components'

const defaultProps = {
    role: 'container',
    children: <Text>{'Hello'}</Text>
}

describe('<Container/>', () => {
    it('should be render', () => {
        const { getByRole } = render(<Container {...defaultProps} />)
        expect(getByRole('container')).toBeDefined()
    })
    it('should be render with a children', () => {
        const { getByRole, getByText } = render(<Container {...defaultProps} />)
        expect(getByRole('container')).toBeDefined()
        expect(getByText('Hello')).toBeDefined()
    })
    it('should have a container and mx-auto classes', () => {
        const { getByRole } = render(<Container {...defaultProps} />)
        expect(getByRole('container')).toHaveClass('container')
        expect(getByRole('container')).toHaveClass('mx-auto')
    })
    it('should have render with a custom className', () => {
        const { getByRole } = render(<Container {...defaultProps} className="test-class" />)
        expect(getByRole('container')).toHaveClass('test-class')
    })

    describe('prop: rounded', () => {
        it('should have a rounded type lg', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="lg" />)
            expect(getByRole('container')).toHaveClass('rounded-lg')
        })
        it('should have a rounded type sm', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="sm" />)
            expect(getByRole('container')).toHaveClass('rounded-sm')
        })
        it('should have a rounded type md', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="md" />)
            expect(getByRole('container')).toHaveClass('rounded-md')
        })
        it('should have a rounded type xl', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="xl" />)
            expect(getByRole('container')).toHaveClass('rounded-xl')
        })
        it('should have a rounded type 2xl', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="2xl" />)
            expect(getByRole('container')).toHaveClass('rounded-2xl')
        })
        it('should have a rounded type 2xl', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="3xl" />)
            expect(getByRole('container')).toHaveClass('rounded-3xl')
        })
        it('should have a rounded type full', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="full" />)
            expect(getByRole('container')).toHaveClass('rounded-full')
        })
        it('should have a rounded type rounded', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="rounded" />)
            expect(getByRole('container')).toHaveClass('rounded-rounded')
        })
        it('should have a rounded type none', () => {
            const { getByRole } = render(<Container {...defaultProps} rounded="none" />)
            expect(getByRole('container')).toHaveClass('rounded-none')
        })
    })

    describe('prop: shadow', () => {
        it('should be able to render with a lg shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="lg" />)
            expect(getByRole('container')).toHaveClass('shadow-lg')
        })
        it('should be able to render with a sm shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="sm" />)
            expect(getByRole('container')).toHaveClass('shadow-sm')
        })
        it('should be able to render with a md shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="md" />)
            expect(getByRole('container')).toHaveClass('shadow-md')
        })
        it('should be able to render with a xl shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="xl" />)
            expect(getByRole('container')).toHaveClass('shadow-xl')
        })
        it('should be able to render with a 2xl shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="2xl" />)
            expect(getByRole('container')).toHaveClass('shadow-2xl')
        })
        it('should be able to render with a inner shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="inner" />)
            expect(getByRole('container')).toHaveClass('shadow-inner')
        })
        it('should be able to render with a none shadow', () => {
            const { getByRole } = render(<Container {...defaultProps} shadow="none" />)
            expect(getByRole('container')).toHaveClass('shadow-none')
        })
    })
})
