import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import DropdownCheckbox, { DropdownCheckboxProps } from './DropdownCheckbox'

const props = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  onSubmit: vi.fn(),
  onClose: vi.fn(),
  title: 'Title',
  align: 'left' as DropdownCheckboxProps['align'],
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  allText: 'All',
  initialValue: ['option1']
}

describe('<DropdownCheckbox/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<DropdownCheckbox {...props} />)

    expect(getByRole('dropdown-checkbox')).toBeDefined()
  })

  it('should call onSubmit', () => {
    const { getByRole } = render(<DropdownCheckbox {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('confirm-btn'))

    expect(props.onSubmit).toHaveBeenCalledWith(['option1'])
  })

  it('should call onClose', () => {
    const { getByRole } = render(<DropdownCheckbox {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('cancel-btn'))

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })
})
