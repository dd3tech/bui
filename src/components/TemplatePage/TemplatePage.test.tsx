import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { FilterSearchProps } from 'components/Filters'
import TemplatePage from './TemplatePage'

const title = 'Test Page Title'

const mockClearFilters = {
  onClick: vi.fn(),
  label: 'Clear Filters'
}
const mockCallToAction = {
  onClick: vi.fn(),
  label: 'Call to Action',
  icon: 'AcademicCapIcon' as const
}
const mockSearch: FilterSearchProps = {
  value: '',
  placeholder: 'Search...',
  onChange: vi.fn()
}
const mockArrowSelector = {
  label: 'Move to month',
  onClickLeft: vi.fn(),
  onClickRight: vi.fn()
}

const propsDefault = {
  title,
  search: mockSearch,
  clearFilters: mockClearFilters,
  callToAction: mockCallToAction,
  arrowSelector: mockArrowSelector
}

describe('TemplatePage Component', () => {
  it('renders the title', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    expect(getByText(title)).toBeInTheDocument()
  })

  it('renders the search input', () => {
    const { getByPlaceholderText } = render(<TemplatePage {...propsDefault} />)
    expect(getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders the clear filters button', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    expect(getByText('Clear Filters')).toBeInTheDocument()
  })

  it('renders the call to action button', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    expect(getByText('Call to Action')).toBeInTheDocument()
  })

  it('renders the arrow selector', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    expect(getByText('Move to month')).toBeInTheDocument()
  })

  it('calls the clear filters function when the clear button is clicked', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    fireEvent.click(getByText('Clear Filters'))
    expect(mockClearFilters.onClick).toHaveBeenCalled()
  })

  it('calls the call to action function when the button is clicked', () => {
    const { getByText } = render(<TemplatePage {...propsDefault} />)
    fireEvent.click(getByText('Call to Action'))
    expect(mockCallToAction.onClick).toHaveBeenCalled()
  })

  it('renders children when provided', () => {
    const { getByText } = render(
      <TemplatePage {...propsDefault}>
        <div>Child Content</div>
      </TemplatePage>
    )
    expect(getByText('Child Content')).toBeInTheDocument()
  })

  it('does not render the call to action button if callToAction prop is not provided', () => {
    const { queryByText } = render(
      <TemplatePage {...propsDefault} callToAction={undefined} />
    )
    expect(queryByText('Call to Action')).not.toBeInTheDocument()
  })

  it('does not render the search input if search prop is not provided', () => {
    const { queryByPlaceholderText } = render(
      <TemplatePage {...propsDefault} search={undefined} />
    )
    expect(queryByPlaceholderText('Search...')).not.toBeInTheDocument()
  })

  it('does not render the clear filters button if clearFilters prop is not provided', () => {
    const { queryByText } = render(
      <TemplatePage {...propsDefault} clearFilters={undefined} />
    )
    expect(queryByText('Clear Filters')).not.toBeInTheDocument()
  })

  it('does not render the arrow selector if arrowSelector prop is not provided', () => {
    const { queryByText } = render(
      <TemplatePage {...propsDefault} arrowSelector={undefined} />
    )
    expect(queryByText('Move to month')).not.toBeInTheDocument()
  })
})
