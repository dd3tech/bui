import { fireEvent, render } from '@testing-library/react'
import { vi } from 'vitest'
import DropdownRadio, { DropdownRadioProps } from './DropdownRadio'

const props = {
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  onSubmit: vi.fn(),
  onClose: vi.fn(),
  title: 'Title',
  align: 'left' as DropdownRadioProps['align'],
  options: [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ],
  initialValue: 'option1'
}

describe('<DropdownRadio/>', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be rendered', () => {
    const { getByRole } = render(<DropdownRadio {...props} />)

    expect(getByRole('dropdown-radio')).toBeDefined()
  })

  it('should call onSubmit', () => {
    const { getByRole } = render(<DropdownRadio {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('confirm-btn'))

    expect(props.onSubmit).toHaveBeenCalledWith('option1')
  })

  it('should call onClose', () => {
    const { getByRole } = render(<DropdownRadio {...props} />)

    fireEvent.click(getByRole('filter-input'))
    fireEvent.click(getByRole('cancel-btn'))

    expect(props.onClose).toHaveBeenCalledTimes(1)
  })
})
