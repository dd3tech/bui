import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import ToggleButton from './ToggleButton'

const props = {
  iconOff: <span>A</span>,
  iconOn: <span>B</span>,
  isActive: true,
  onToggle: vi.fn(),
  disabled: false,
  tooltipLabel: 'tooltip'
}

describe('<ToggleButton/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<ToggleButton {...props} />)

    expect(getByRole('toggle-button')).toBeDefined()
  })

  it('should call onToggle when clicked', () => {
    const { getByRole } = render(<ToggleButton {...props} />)

    fireEvent.click(getByRole('toggle-button'))

    expect(props.onToggle).toHaveBeenCalledWith(false)
  })

  it('should not call onToggle when disabled', () => {
    const { getByRole } = render(<ToggleButton {...props} disabled />)

    fireEvent.click(getByRole('toggle-button'))

    expect(props.onToggle).not.toHaveBeenCalled()
  })

  it('should toggle state', () => {
    const { getByRole } = render(<ToggleButton {...props} />)

    fireEvent.click(getByRole('toggle-button'))

    expect(getByRole('toggle-button').textContent).toContain('A')
  })
})
