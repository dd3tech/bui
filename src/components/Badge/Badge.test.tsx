import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import Badge from './Badge'

describe('<Badge />', () => {
  afterEach(cleanup)

  it('should render the badge with the correct value', () => {
    const { getByText } = render(<Badge value={5} variant="error" />)
    expect(getByText('5')).toBeDefined()
  })

  it('should apply the correct classes for "warning" variant', () => {
    const { container } = render(<Badge value={9} variant="warning" />)
    const badge = container.firstChild as HTMLElement

    expect(badge.className).toContain('bg-yellow-400')
    expect(badge.className).toContain('text-white')
    expect(badge.className).toContain('rounded-2xl')
    expect(badge.className).toContain('text-xs')
    expect(badge.className).toContain('font-medium')
  })

  it('should apply default variant styles when variant is not provided', () => {
    const { container } = render(<Badge value={1} />)
    const badge = container.firstChild as HTMLElement

    expect(badge.className).toContain('bg-blue-800')
    expect(badge.className).toContain('text-white')
  })

  it('should apply correct styles for size', () => {
    const { container } = render(<Badge value={3} variant="success" />)
    const badge = container.firstChild as HTMLElement

    expect(badge.style.height).toBe('24px')
    expect(badge.style.width).toBe('24px')
  })
})
