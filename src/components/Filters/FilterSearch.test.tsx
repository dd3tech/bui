import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import FilterSearch from './FilterSearch'

const props = {
  onChange: vi.fn(),
  placeholder: 'placeholder',
  value: 'test search',
  disabled: false,
  label: 'label'
}

describe('<FilterSearch/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<FilterSearch {...props} />)

    expect(getByRole('filter-search')).toBeDefined()
  })

  it('should display the value', () => {
    const { getByRole } = render(<FilterSearch {...props} />)

    expect(getByRole('filter-search')).toHaveValue('test search')
  })

  it('should run onChange', () => {
    const { getByRole } = render(<FilterSearch {...props} />)

    fireEvent.change(getByRole('filter-search'), {
      target: { value: 'new search' }
    })

    expect(props.onChange).toHaveBeenCalled()
  })
})
