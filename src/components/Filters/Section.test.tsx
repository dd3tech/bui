import { render } from '@testing-library/react'
import { vi } from 'vitest'
import Section from './Section'

const props = {
  borderLeft: true,
  borderRight: true
}

describe('<Section/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<Section {...props} />)

    expect(getByRole('filter-bar-section')).toBeDefined()
  })

  it('should have border left', () => {
    const { container } = render(<Section {...props} />)

    expect(container.firstChild).toHaveClass('border-l-2')
  })

  it('should have border right', () => {
    const { container } = render(<Section {...props} />)

    expect(container.firstChild).toHaveClass('border-r-2')
  })

  it('should not have border left', () => {
    const { container } = render(<Section />)

    expect(container.firstChild).not.toHaveClass('border-l-2')
  })

  it('should not have border right', () => {
    const { container } = render(<Section />)

    expect(container.firstChild).not.toHaveClass('border-r-2')
  })
})
