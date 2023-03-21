import { render, fireEvent } from '@testing-library/react'
import { describe, it } from 'vitest'
import PasswordInput from './PasswordInput'

describe('<PasswordInput />', () => {
  it('was renderer', () => {
    const { container, getByRole } = render(<PasswordInput role="input" />)
    expect(container.children).toBeDefined()
    expect(getByRole('input')).toBeInTheDocument()
  })

  it('changes type when button is clicked', () => {
    const { getByRole } = render(<PasswordInput role="input" />)
    const button = getByRole('showText')
    fireEvent.click(button)
    expect(getByRole('input')).toHaveAttribute('type', 'text')
    expect(button.firstChild).toHaveAttribute('aria-label', 'eyeOn')
    fireEvent.click(button)
    expect(getByRole('input')).toHaveAttribute('type', 'password')
    expect(button.firstChild).toHaveAttribute('aria-label', 'eyeOff')
  })
})
