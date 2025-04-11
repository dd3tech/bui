import { describe, it, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Text } from 'components'
import SpecialButton from './SpecialButton'

const MockIcon = () => <span data-testid="mock-icon">ˣ</span>

const onClickPrimary = vi.fn()
const onClickSecondary = vi.fn()
const onClickRight = vi.fn()
const onClickMain = vi.fn()
const onClickLeft = vi.fn()

const defaultProps = {
  valueBadge: 3,
  label: 'Test Button',
  principalButton: { label: 'Filters', onClick: onClickMain },
  titlePopover: 'Popover Title',
  childrenPopover: <Text>Popover Content</Text>,
  primaryButton: { label: 'Confirm', onClick: onClickPrimary },
  secondaryButton: { label: 'Cancel', onClick: onClickSecondary },
  iconRight: {
    icon: <MockIcon />,
    onClick: onClickRight
  },
  iconLeft: {
    icon: <MockIcon />,
    onClick: onClickLeft
  }
}

describe('<SpecialButton />', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render correctly', () => {
    const { getByTestId } = render(<SpecialButton {...defaultProps} />)
    expect(getByTestId('special-button')).toBeDefined()
  })

  it('should toggle popover on button click', () => {
    const { getByTestId, getByText, queryByText } = render(
      <SpecialButton {...defaultProps} />
    )

    const button = getByTestId('special-button')
    expect(queryByText('Popover Title')).toBeNull()

    fireEvent.click(button)
    expect(getByText('Popover Title')).toBeDefined()

    fireEvent.click(getByText('Popover Title')) // Esto depende de tu implementación real
  })

  it('should call iconLeft.onClick without triggering main button click', () => {
    const { getAllByTestId } = render(<SpecialButton {...defaultProps} />)

    fireEvent.click(getAllByTestId('mock-icon')[0])
    expect(onClickLeft).toHaveBeenCalled()
    expect(onClickMain).not.toHaveBeenCalled()
  })

  it('should call iconRight.onClick without triggering main button click', () => {
    const { getAllByTestId } = render(<SpecialButton {...defaultProps} />)

    fireEvent.click(getAllByTestId('mock-icon')[1])
    expect(onClickRight).toHaveBeenCalled()
    expect(onClickMain).not.toHaveBeenCalled()
  })

  it('should render and trigger primary and secondary buttons in popover', () => {
    const { getByTestId, getByText } = render(
      <SpecialButton {...defaultProps} />
    )

    fireEvent.click(getByTestId('special-button'))
    fireEvent.click(getByText('Confirm'))
    fireEvent.click(getByText('Cancel'))

    expect(onClickPrimary).toHaveBeenCalled()
    expect(onClickSecondary).toHaveBeenCalled()
  })
})
