import { render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterLabel from './FilterLabel'

const props = {
  label: 'label',
  number: 1,
  isLoading: false
}

describe('<FilterLabel/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<FilterLabel {...props} />)

    expect(getByRole('filter-label')).toBeDefined()
  })

  it('should render the number', () => {
    const { getByRole } = render(<FilterLabel {...props} />)

    expect(getByRole('filter-label-number')).toBeDefined()
  })

  it('should render the label', () => {
    const { getByRole } = render(<FilterLabel {...props} />)

    expect(getByRole('fiter-label-text')).toBeDefined()
  })

  it('should render the skeleton', () => {
    const { getByRole } = render(<FilterLabel {...props} isLoading />)

    expect(getByRole('filter-labe-skeleton')).toBeDefined()
  })
})
