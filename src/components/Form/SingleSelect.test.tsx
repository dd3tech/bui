import { vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import SingleSelect from './SingleSelect'

const optionsList = [
  { value: '1', label: 'Option 1', disabled: false },
  { value: '2', label: 'Option 2', disabled: false },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4', disabled: false, selected: true }
]

describe('<SingleSelect />', () => {
  it('should render with label', () => {
    const label = 'Select Label'
    const { getByText, getByRole } = render(
      <SingleSelect label={label} optionsList={optionsList} />
    )
    fireEvent.click(getByRole('select-container-group'))
    expect(getByText(label)).toBeInTheDocument()
  })

  it('should render option list when clicked', () => {
    const { getByText, getByRole } = render(
      <SingleSelect optionsList={optionsList} />
    )

    fireEvent.click(getByRole('select-container-group'))
    optionsList.forEach((option) => {
      if (option.label) {
        expect(getByText(option.label)).toBeInTheDocument()
      }
    })
  })

  it('should handle disabled state', () => {
    const { getByRole } = render(
      <SingleSelect optionsList={optionsList} isDisabled />
    )
    expect(getByRole('select-container')).toHaveClass('cursor-not-allowed')
  })

  it('should handle option selection', () => {
    const onChangeSelect = vi.fn()
    const { getByRole, getByText } = render(
      <SingleSelect optionsList={optionsList} onChangeSelect={onChangeSelect} />
    )
    fireEvent.click(getByRole('select-container-group'))
    fireEvent.click(getByText('Option 1'))
    expect(onChangeSelect).toHaveBeenCalledWith(optionsList[0])
  })

  it('should not select disabled options', () => {
    const onChangeSelect = vi.fn()
    const { getByRole, getByText } = render(
      <SingleSelect optionsList={optionsList} onChangeSelect={onChangeSelect} />
    )
    fireEvent.click(getByRole('select-container-group'))
    const disabledOption = getByText('Option 3')
    fireEvent.click(disabledOption)
    expect(onChangeSelect).not.toHaveBeenCalled()
  })

  it('should close dropdown when clicking outside', () => {
    const { getByRole, getByText, queryByText } = render(
      <SingleSelect optionsList={optionsList} />
    )
    fireEvent.click(getByRole('select-container-group'))
    expect(getByText('Option 1')).toBeInTheDocument()
    fireEvent.click(document.body)
    expect(queryByText('Option 1')).not.toBeInTheDocument()
  })

  it('should show check icon on selected option', () => {
    const { getByRole, getByText } = render(
      <SingleSelect optionsList={optionsList} value="4" />
    )
    fireEvent.click(getByRole('select-container-group'))

    const optionContainer = getByText('Option 4').closest('div')
    expect(optionContainer).toHaveClass('text-blue-700')
    expect(optionContainer?.querySelector('svg')).toBeInTheDocument()
  })
})
