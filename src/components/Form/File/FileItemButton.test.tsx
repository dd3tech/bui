import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FileItemButton from './FileItemButton'

const handleClick = vi.fn()

describe('<FileItemButton>', () => {
  it('renders children content', () => {
    const { getByRole } = render(<FileItemButton>Test Button</FileItemButton>)

    expect(getByRole('button-file-item')).toBeDefined()
  })

  it('calls onClick handler when clicked', () => {
    render(<FileItemButton onClick={handleClick}>Click Me</FileItemButton>)

    fireEvent.click(screen.getByText('Click Me'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies danger styling when isDanger is true', () => {
    const { getByRole } = render(
      <FileItemButton isDanger>Danger Button</FileItemButton>
    )

    const buttonElement = getByRole('button-file-item').closest('button')

    expect(buttonElement).toHaveClass('text-red-500')
  })
})
