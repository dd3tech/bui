import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SnackBar from './SnackBar'

describe('<SnackBar />', () => {
  const mockPrimaryButtonClick = vi.fn()
  const mockGhostButtonClick = vi.fn()

  const defaultProps = {
    show: true,
    title: {
      label: 'Test Title'
    },
    description: 'This is a test description',
    buttonPrimary: {
      label: 'Primary',
      position: 'right' as const,
      onClick: mockPrimaryButtonClick
    },
    buttonGhost: {
      label: 'Ghost',
      position: 'left' as const,
      onClick: mockGhostButtonClick
    }
  }

  it('should render correctly with default props', () => {
    const { getByText } = render(<SnackBar {...defaultProps} />)

    expect(getByText('Test Title')).toBeInTheDocument()
    expect(getByText('This is a test description')).toBeInTheDocument()
    expect(getByText('Primary')).toBeInTheDocument()
    expect(getByText('Ghost')).toBeInTheDocument()
  })

  it('should not render when show is false', () => {
    const { queryByText } = render(<SnackBar {...defaultProps} show={false} />)

    expect(queryByText('Test Title')).not.toBeInTheDocument()
  })

  it('should trigger the primary button click handler', () => {
    const { getByText } = render(<SnackBar {...defaultProps} />)

    const primaryButton = getByText('Primary')
    fireEvent.click(primaryButton)

    expect(mockPrimaryButtonClick).toHaveBeenCalled()
  })

  it('should trigger the ghost button click handler', () => {
    const { getByText } = render(<SnackBar {...defaultProps} />)

    const ghostButton = getByText('Ghost')
    fireEvent.click(ghostButton)

    expect(mockGhostButtonClick).toHaveBeenCalled()
  })

  it('should render icons in the correct position', () => {
    const { getByText } = render(<SnackBar {...defaultProps} />)

    const ghostButton = getByText('Ghost').parentElement
    const primaryButton = getByText('Primary').parentElement

    expect(ghostButton?.firstChild).toHaveClass('w-4 h-4')
    expect(primaryButton?.lastChild).toHaveClass('w-4 h-4')
  })
})
