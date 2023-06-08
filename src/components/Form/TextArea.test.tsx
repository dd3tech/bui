import { it, describe, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import UserCircleIcon from '@heroicons/react/outline/UserCircleIcon'
import TextArea from './TextArea'

const defProps = {
  role: 'textarea',
  onChange: vi.fn()
}

describe('<TextArea/>', () => {
  it('should be render', () => {
    const { getByRole } = render(<TextArea {...defProps} />)
    expect(getByRole('textarea')).toBeDefined()
  })

  it('should be render correctly with label prop', () => {
    const { getByText } = render(<TextArea label="Email" />)
    const label = getByText('Email')
    expect(label).toBeInTheDocument()
  })

  it('should be render correctly with inputBlank prop', () => {
    const { getByRole } = render(<TextArea {...defProps} inputBlank />)
    const box = getByRole('textarea-container')
    expect(box.className).toContain('border-none')
  })

  it('should be render correctly with endAdornment prop', () => {
    const { getByTestId } = render(
      <TextArea endAdornment={<UserCircleIcon aria-label="user-circle" />} />
    )
    const adornment = getByTestId('endAdornment')
    expect(adornment.firstChild).toHaveAttribute('aria-label', 'user-circle')
  })

  it('should be render a message helper correctly', () => {
    const { getByText } = render(<TextArea message="helper message" />)
    const message = getByText('helper message')
    expect(message).toBeInTheDocument()
  })

  describe('checking variant types', () => {
    it('should be render the "active" variant correctly', () => {
      const { getByRole } = render(<TextArea {...defProps} variant="active" />)
      expect(getByRole('textarea-container')).toHaveClass('border-blue-500')
    })

    it('should be render the "success" variant correctly', () => {
      const { getByRole } = render(<TextArea {...defProps} variant="success" />)
      expect(getByRole('textarea-container')).toHaveClass('border-success')
    })

    it('should be render the "warning" variant correctly', () => {
      const { getByRole } = render(<TextArea {...defProps} variant="warning" />)
      expect(getByRole('textarea-container')).toHaveClass('border-warning')
    })

    it('should be render the "disabled" variant correctly', () => {
      const { getByRole, getByText } = render(
        <TextArea {...defProps} variant="disabled" label="Example" />
      )
      expect(getByRole('textarea-container')).toHaveClass('bg-gray-100')
      const label = getByText('Example')

      expect(label).toBeInTheDocument()
      expect(label).toHaveClass('text-gray-400')
    })
  })

  it('should render disabled', () => {
    const { getByRole } = render(<TextArea {...defProps} disabled />)
    expect(getByRole('textarea')).toBeDisabled()
  })

  it('should render without disabled', () => {
    const { getByRole } = render(<TextArea {...defProps} />)
    expect(getByRole('textarea')).not.toBeDisabled()
  })

  it('should render with a custom maxLenght prop', async () => {
    const { getByRole } = render(<TextArea {...defProps} maxLength={500} />)
    const textArea = getByRole('textarea')
    expect(textArea.getAttribute('maxlength')).toBe('500')
  })

  it('should render with a custom value prop', async () => {
    const { getByText } = render(
      <TextArea {...defProps} value={'Hello'} data-testid="textarea" />
    )
    const textArea = getByText('Hello')
    expect(textArea).toBeDefined()
  })

  it('should be able to be changed by event', () => {
    const { getByRole } = render(<TextArea {...defProps} />)
    const textArea = getByRole('textarea') as HTMLInputElement

    fireEvent.change(textArea, { target: { value: 'Welcome' } })

    expect(textArea.value).toBe('Welcome')
  })

  it('handles focus and blur events correctly', () => {
    const onBlur = vi.fn()
    const onFocus = vi.fn()
    const { getByTestId, getByRole } = render(
      <TextArea
        {...defProps}
        data-testid="textarea"
        value=""
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
    const textareaContainer = getByRole('textarea-container')
    const textarea = getByTestId('textarea')
    fireEvent.focus(textarea)
    expect(textareaContainer).toHaveClass('border-blue-500')
    fireEvent.blur(textarea)
    expect(textareaContainer).not.toHaveClass('border-blue-500')
    expect(onFocus).toHaveBeenCalled()
    expect(onBlur).toHaveBeenCalled()
  })
})
