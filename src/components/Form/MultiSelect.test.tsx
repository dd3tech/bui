import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MultiSelect from './MultiSelect'

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true }
]

const defaultProps = {
  label: 'Select options',
  optionsList: mockOptions,
  buttonSubmit: {
    label: 'Apply',
    onClick: vi.fn()
  },
  buttonClear: {
    label: 'Clear',
    onClick: vi.fn()
  }
}

describe('<MultiSelect />', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<MultiSelect {...defaultProps} />)

    const selectContainer = getByTestId('select-container')
    fireEvent.click(selectContainer)

    expect(getByText('Select options')).toBeInTheDocument()
    expect(selectContainer).toBeInTheDocument()
  })
  it('should open dropdown when clicked', () => {
    const { getByTestId } = render(<MultiSelect {...defaultProps} />)

    const selectContainer = getByTestId('select-container')
    fireEvent.click(selectContainer)

    expect(getByTestId('select-all')).toBeInTheDocument()
    expect(getByTestId('option-1')).toBeInTheDocument()
    expect(getByTestId('option-2')).toBeInTheDocument()
    expect(getByTestId('option-3')).toBeInTheDocument()
  })

  it('should select an option when checkbox is clicked', () => {
    const { getByTestId } = render(<MultiSelect {...defaultProps} />)

    fireEvent.click(getByTestId('select-container'))

    const checkbox = getByTestId('option-1')
    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('should show badge when options are selected', () => {
    const { getByTestId, getByText } = render(<MultiSelect {...defaultProps} />)

    fireEvent.click(getByTestId('select-container'))
    fireEvent.click(getByTestId('option-1'))

    expect(getByText('1')).toBeInTheDocument()
  })

  it('should select all options when "All" is clicked', () => {
    const { getByTestId } = render(<MultiSelect {...defaultProps} />)

    const selectContainer = getByTestId('select-container')
    fireEvent.click(selectContainer)

    const allCheckbox = getByTestId('select-all')
    fireEvent.click(allCheckbox)

    const option1Checkbox = getByTestId('option-1')
    const option2Checkbox = getByTestId('option-2')

    expect(option1Checkbox).toBeChecked()
    expect(option2Checkbox).toBeChecked()
  })

  it('should disable options marked as disabled', () => {
    const { getByTestId } = render(<MultiSelect {...defaultProps} />)

    fireEvent.click(getByTestId('select-container'))
    expect(getByTestId('option-3')).toBeDisabled()
  })

  it('should call buttonSubmit.onClick when Apply button is clicked', () => {
    const { getByTestId, getByText } = render(<MultiSelect {...defaultProps} />)

    fireEvent.click(getByTestId('select-container'))
    fireEvent.click(getByText('Apply'))

    expect(defaultProps.buttonSubmit.onClick).toHaveBeenCalled()
  })

  it('should call buttonClear.onClick when Clear button is clicked', () => {
    const { getByTestId, getByText } = render(<MultiSelect {...defaultProps} />)

    fireEvent.click(getByTestId('select-container'))
    fireEvent.click(getByText('Clear'))

    expect(defaultProps.buttonClear.onClick).toHaveBeenCalled()
  })

  it('should close dropdown when clicking outside', () => {
    const { getByTestId, queryByTestId } = render(
      <div>
        <MultiSelect {...defaultProps} />
        <div data-testid="outside">Outside component</div>
      </div>
    )

    fireEvent.click(getByTestId('select-container'))
    expect(getByTestId('select-all')).toBeInTheDocument()

    fireEvent.click(getByTestId('outside'))
    expect(queryByTestId('select-all')).not.toBeInTheDocument()
  })

  it('should not open dropdown when component is disabled', () => {
    const { getByTestId, queryByTestId } = render(
      <MultiSelect {...defaultProps} isDisabled={true} />
    )

    fireEvent.click(getByTestId('select-container'))
    expect(queryByTestId('select-all')).not.toBeInTheDocument()
  })

  it('should update selected options when optionsList changes', () => {
    const newOptions = [
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' }
    ]
    const { getByTestId } = render(
      <MultiSelect {...defaultProps} optionsList={newOptions} />
    )

    fireEvent.click(getByTestId('select-container'))
    expect(getByTestId('option-4')).toBeInTheDocument()
    expect(getByTestId('option-5')).toBeInTheDocument()
  })
})
