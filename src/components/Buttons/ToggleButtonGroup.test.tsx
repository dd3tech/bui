import { render, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import ToggleButtonGroup, { ToggleOption } from './ToggleButtonGroup'

const mockOptions: ToggleOption[] = [
  { id: 'option1', label: 'Option 1' },
  { id: 'option2', label: 'Option 2' },
  { id: 'option3', label: 'Option 3' }
]

const singleOption: ToggleOption[] = [{ id: 'toggle', label: 'Toggle Me' }]

describe('<ToggleButtonGroup />', () => {
  describe('Group Mode', () => {
    it('should render group mode with multiple options', () => {
      const { getByRole, getAllByRole } = render(
        <ToggleButtonGroup items={mockOptions} kind="group" />
      )

      expect(getByRole('radiogroup')).toBeDefined()
      expect(getAllByRole('radio')).toHaveLength(3)
    })

    it('should render with correct labels', () => {
      const { getByText } = render(
        <ToggleButtonGroup items={mockOptions} kind="group" />
      )

      expect(getByText('Option 1')).toBeDefined()
      expect(getByText('Option 2')).toBeDefined()
      expect(getByText('Option 3')).toBeDefined()
    })

    it('should select option when clicked', () => {
      const onChange = vi.fn()
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          onChange={onChange}
        />
      )

      const buttons = getAllByRole('radio')
      fireEvent.click(buttons[0])

      expect(onChange).toHaveBeenCalledWith('option1')
      expect(buttons[0]).toHaveAttribute('aria-checked', 'true')
    })

    it('should allow deselect when allowDeselect is true', () => {
      const onChange = vi.fn()
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          allowDeselect={true}
          onChange={onChange}
        />
      )

      const buttons = getAllByRole('radio')

      // Click to select
      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith('option1')

      // Click again to deselect
      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith(null)
    })

    it('should not allow deselect when allowDeselect is false', () => {
      const onChange = vi.fn()
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          allowDeselect={false}
          onChange={onChange}
        />
      )

      const buttons = getAllByRole('radio')

      // Click to select
      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith('option1')

      // Click again - should stay selected
      fireEvent.click(buttons[0])
      expect(onChange).toHaveBeenCalledWith('option1')
    })

    it('should handle controlled value', () => {
      const onChange = vi.fn()
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          value="option2"
          onChange={onChange}
        />
      )

      const buttons = getAllByRole('radio')
      expect(buttons[1]).toHaveAttribute('aria-checked', 'true')
    })

    it('should handle disabled options', () => {
      const disabledOptions: ToggleOption[] = [
        { id: 'option1', label: 'Option 1', disabled: true },
        { id: 'option2', label: 'Option 2' }
      ]

      const onChange = vi.fn()
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={disabledOptions}
          kind="group"
          onChange={onChange}
        />
      )

      const buttons = getAllByRole('radio')
      expect(buttons[0]).toHaveAttribute('disabled')

      fireEvent.click(buttons[0])
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Single Mode', () => {
    it('should render single mode as a switch', () => {
      const { getByRole } = render(
        <ToggleButtonGroup items={singleOption} kind="single" />
      )

      expect(getByRole('switch')).toBeDefined()
    })

    it('should handle controlled value', () => {
      const { getByRole } = render(
        <ToggleButtonGroup items={singleOption} kind="single" value={true} />
      )

      const button = getByRole('switch')
      expect(button).toHaveAttribute('aria-checked', 'true')
    })

    it('should handle uncontrolled defaultValue', () => {
      const { getByRole } = render(
        <ToggleButtonGroup
          items={singleOption}
          kind="single"
          defaultValue={true}
        />
      )

      const button = getByRole('switch')
      expect(button).toHaveAttribute('aria-checked', 'true')
    })

    it('should toggle on/off when clicked', () => {
      const onChange = vi.fn()
      const { getByRole } = render(
        <ToggleButtonGroup
          items={singleOption}
          kind="single"
          onChange={onChange}
        />
      )

      const button = getByRole('switch')

      fireEvent.click(button)
      expect(onChange).toHaveBeenCalledWith(true)
      expect(button).toHaveAttribute('aria-checked', 'true')

      fireEvent.click(button)
      expect(onChange).toHaveBeenCalledWith(false)
      expect(button).toHaveAttribute('aria-checked', 'false')
    })

    it('should handle disabled state', () => {
      const disabledOption: ToggleOption[] = [
        { id: 'toggle', label: 'Toggle Me', disabled: true }
      ]

      const onChange = vi.fn()
      const { getByRole } = render(
        <ToggleButtonGroup
          items={disabledOption}
          kind="single"
          onChange={onChange}
        />
      )

      const button = getByRole('switch')
      expect(button).toHaveAttribute('disabled')

      fireEvent.click(button)
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Sizes', () => {
    it('should apply correct size classes', () => {
      const { container, rerender } = render(
        <ToggleButtonGroup items={mockOptions} kind="group" size="xs" />
      )

      const button = container.querySelector('button')
      expect(button?.className).toContain('px-2 py-1 text-xs')

      rerender(<ToggleButtonGroup items={mockOptions} kind="group" size="sm" />)
      expect(button?.className).toContain('px-3 py-1.5 text-sm')

      rerender(<ToggleButtonGroup items={mockOptions} kind="group" size="md" />)
      expect(button?.className).toContain('px-4 py-2 text-base')

      rerender(<ToggleButtonGroup items={mockOptions} kind="group" size="lg" />)
      expect(button?.className).toContain('px-5 py-2.5 text-lg')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { getByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          aria-label="Test Group"
        />
      )

      const group = getByRole('radiogroup')
      expect(group).toHaveAttribute('aria-label', 'Test Group')
    })

    it('should have proper tabindex for group mode', () => {
      const { getAllByRole } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          defaultValue="option1"
        />
      )

      const buttons = getAllByRole('radio')
      expect(buttons[0]).toHaveAttribute('tabindex', '0')
      expect(buttons[1]).toHaveAttribute('tabindex', '-1')
    })
  })

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(
        <ToggleButtonGroup
          items={mockOptions}
          kind="group"
          className="custom-class"
        />
      )

      const group = container.firstChild as HTMLElement
      expect(group.className).toContain('custom-class')
    })
  })

  describe('Tooltips', () => {
    it('should render tooltips when provided', () => {
      const optionsWithTooltips: ToggleOption[] = [
        { id: 'option1', label: 'Option 1', tooltip: 'Tooltip 1' },
        { id: 'option2', label: 'Option 2', tooltip: 'Tooltip 2' }
      ]

      const { getAllByRole } = render(
        <ToggleButtonGroup items={optionsWithTooltips} kind="group" />
      )

      const buttons = getAllByRole('radio')
      expect(buttons[0]).toHaveAttribute('title', 'Tooltip 1')
      expect(buttons[1]).toHaveAttribute('title', 'Tooltip 2')
    })
  })
})
