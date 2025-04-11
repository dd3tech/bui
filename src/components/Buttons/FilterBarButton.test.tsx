import { describe, it, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Text } from 'components'
import FilterBarButton from './FilterBarButton'

const MockIcon = () => <span data-testid="mock-icon">ˣ</span>

const onClickPrimary = vi.fn()
const onClickSecondary = vi.fn()
const onClickMain = vi.fn()

const defaultProps = {
  valueBadge: 3,
  label: 'Test Button',
  principalButton: { label: 'Filters', onClick: onClickMain },
  titlePopover: 'Popover Title',
  childrenPopover: <Text>Popover Content</Text>,
  primaryButton: { label: 'Confirm', onClick: onClickPrimary },
  secondaryButton: { label: 'Cancel', onClick: onClickSecondary },
  iconRight: <MockIcon />,
  iconLeft: <MockIcon />
}

describe('<FilterBarButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = render(<FilterBarButton {...defaultProps} />)
    expect(getByTestId('filter-bar-button')).toBeDefined()
  })

  it('should toggle popover on button click', () => {
    const { getByTestId, getByText, queryByText } = render(
      <FilterBarButton {...defaultProps} />
    )

    const button = getByTestId('filter-bar-button')
    expect(queryByText('Popover Title')).toBeNull()

    fireEvent.click(button)
    expect(getByText('Popover Title')).toBeDefined()

    fireEvent.click(getByText('Popover Title'))
  })

  it('should render and trigger primary and secondary buttons in popover', () => {
    const { getByTestId, getByText } = render(
      <FilterBarButton {...defaultProps} />
    )

    fireEvent.click(getByTestId('filter-bar-button'))
    fireEvent.click(getByText('Confirm'))
    fireEvent.click(getByText('Cancel'))

    expect(onClickPrimary).toHaveBeenCalled()
    expect(onClickSecondary).toHaveBeenCalled()
  })
})
