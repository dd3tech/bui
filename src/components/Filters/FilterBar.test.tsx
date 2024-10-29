import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterBar from './FilterBar'

describe('<FilterBar/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<FilterBar />)

    expect(getByRole('filter-bar')).toBeDefined()
  })
})
