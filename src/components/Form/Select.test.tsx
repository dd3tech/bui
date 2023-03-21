import { fireEvent, render } from '@testing-library/react'
import {
  ExclamationCircleIcon,
  AcademicCapIcon
} from '@heroicons/react/outline'
import Select from './Select'
import { vi } from 'vitest'

describe('<Select />', () => {
  const optionsList = {
    1: { label: 'Option 1', disabled: false },
    2: { label: 'Option 2', disabled: false },
    3: { label: 'Option 3', disabled: true, selected: true },
    'Option 4': { disabled: true },
    5: 'Option 5'
  }

  it('should be rendered with label', () => {
    const label = 'Select Label'
    const { getByText } = render(
      <Select label={label} optionsList={optionsList} />
    )

    const labelElement = getByText(label)
    expect(labelElement).toBeInTheDocument()
  })

  it('should be rendered with start adornment', () => {
    const startAdornment = (
      <ExclamationCircleIcon aria-label="icon" className="w-5" />
    )
    const { getByTestId } = render(
      <Select startAdornment={startAdornment} optionsList={optionsList} />
    )
    const adornment = getByTestId('startAdornment')

    expect(adornment.firstChild).toHaveAttribute('aria-label', 'icon')
  })

  it('should be rendered with end adornment', () => {
    const { getByTestId } = render(
      <Select
        endAdornment={
          <AcademicCapIcon aria-label="academicIcon" className="w-5" />
        }
        optionsList={optionsList}
      />
    )

    const adornment = getByTestId('endAdornment')
    expect(adornment.firstChild).toHaveAttribute('aria-label', 'academicIcon')
  })

  it('should be rendered option list', () => {
    const simpleList = {
      1: { label: 'Option 1', disabled: false },
      2: { label: 'Option 2', disabled: false }
    }
    const { getByText } = render(<Select optionsList={simpleList} />)

    Object.values(simpleList).forEach((option) => {
      const optionElement = getByText(option.label)
      expect(optionElement).toBeInTheDocument()
    })
  })

  it('should be applied success styles when success prop is passed', () => {
    const { container } = render(
      <Select variant="success" optionsList={optionsList} />
    )
    expect(container.firstChild?.firstChild).toHaveClass('border-green-500')
  })

  it('should be applied error styles when error prop is passed', () => {
    const { container } = render(
      <Select variant="error" optionsList={optionsList} />
    )
    expect(container.firstChild?.firstChild).toHaveClass('border-red-600')
  })

  it('should be applied warning styles when warning prop is passed', () => {
    const { container } = render(
      <Select variant="warning" optionsList={optionsList} />
    )
    expect(container.firstChild?.firstChild).toHaveClass('border-yellow-500')
  })

  describe('prop disabled', () => {
    it('should be applied disabled styles when disabled prop is passed', () => {
      const { container } = render(
        <Select disabled optionsList={optionsList} />
      )
      expect(container.firstChild?.firstChild).toHaveClass('border-gray-300')
    })

    it('should be applied disabled styles when the variant is disabled', () => {
      const { container } = render(
        <Select variant="disabled" optionsList={optionsList} />
      )
      expect(container.firstChild?.firstChild).toHaveClass('border-gray-300')
    })
  })

  describe('prop padding and paddingY', () => {
    it('should be applied custom padding when padding prop is passed', () => {
      const padding = '6'
      const { getByRole } = render(
        <Select padding={padding} optionsList={optionsList} />
      )
      const selectElement = getByRole('select-container')

      expect(selectElement).toHaveClass(`p-${padding}`)
    })
    it('should be applied custom paddingY when paddingY prop is passed', () => {
      const padding = '3'
      const { getByRole } = render(
        <Select paddingY={padding} optionsList={optionsList} />
      )
      const selectElement = getByRole('select-container')

      expect(selectElement).toHaveClass(`py-${padding}`)
    })
  })

  it('should render a message', () => {
    const message = 'Lorem ipsum dolor'
    const { getByText } = render(
      <Select message={message} optionsList={optionsList} />
    )
    const labelElement = getByText(message)

    expect(labelElement).toBeInTheDocument()
  })

  it('should change the selected element in the onChange', () => {
    const { getByRole } = render(
      <Select role="select" optionsList={optionsList} value="H" />
    )
    const select = getByRole('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 1 } })

    expect(select.value).toBe('1')
  })

  describe('should have a value selected by default', () => {
    it('when passing value as prop', () => {
      const { getByRole } = render(
        <Select role="select" optionsList={optionsList} value="Option 4" />
      )
      const select = getByRole('select') as HTMLSelectElement
      expect(select.value).toBe('Option 4')
    })

    it('when passing value as prop', () => {
      const { getByRole } = render(
        <Select role="select" optionsList={optionsList} />
      )
      const select = getByRole('select') as HTMLSelectElement
      expect(select.value).toBe('3')
    })
  })

  it('should be rendered without borders', () => {
    const { getByRole } = render(
      <Select role="select" optionsList={optionsList} noBorders />
    )
    const select = getByRole('select-container') as HTMLDivElement
    expect(select.className).toContain('border-none')
  })

  it('should render a large select', () => {
    const { getByRole } = render(<Select optionsList={optionsList} large />)
    const inputContainer = getByRole('select-container')
    expect(inputContainer.className).toContain('h-13')
  })

  it('handles focus and blur events correctly', () => {
    const { getByTestId, getByRole } = render(
      <Select data-testid="select" optionsList={optionsList} />
    )
    const selectContainer = getByRole('select-container')
    const select = getByTestId('select')
    fireEvent.focus(select)
    expect(selectContainer).toHaveClass('border-blue-500')
    fireEvent.blur(select)
    expect(selectContainer).not.toHaveClass('border-blue-500')
  })

  it('the options must be displayed when clicking on the select-container and when selecting an option an onChange event must occur', () => {
    const onChange = vi.fn()
    const onBlur = vi.fn()
    const onFocus = vi.fn()
    const { getByRole, getByText } = render(
      <Select
        role="select"
        optionsList={optionsList}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    )
    const selectContainer = getByRole('select-container')
    const select = getByRole('select') as HTMLSelectElement
    fireEvent.click(select)

    fireEvent.focus(select)
    expect(onFocus).toHaveBeenCalled()

    fireEvent.blur(select)
    expect(onBlur).toHaveBeenCalled()

    fireEvent.focus(select)
    expect(selectContainer).toHaveClass('border-blue-500')
    fireEvent.click(getByText('Option 1'))
    expect(select.value).toBe('1')
    expect(onChange).toHaveBeenCalled()
  })
})
