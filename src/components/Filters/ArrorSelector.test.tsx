import { render, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ArrowSelector from './ArrowSelector'

const props = {
  label: 'label',
  onClickLeft: vi.fn(),
  onClickRight: vi.fn(),
  toggleOptions: {
    firstOption: 'Option 1',
    secondOption: 'Option 2',
    optionSelected: 'Option 1',
    onOptionChange: vi.fn()
  }
}

describe('<ArrowSelector />', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should be render', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    expect(getByRole('arrow-selector')).toBeDefined()
  })

  it('should display the label', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)
    expect(getByRole('arrow-selector-label')).toHaveTextContent('label')
  })

  it('should call onClickLeft when left arrow is clicked', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    fireEvent.click(getByRole('arrow-selector-left'))
    expect(props.onClickLeft).toHaveBeenCalled()
  })

  it('should call onClickRight when right arrow is clicked', () => {
    const { getByRole } = render(<ArrowSelector {...props} />)

    fireEvent.click(getByRole('arrow-selector-right'))
    expect(props.onClickRight).toHaveBeenCalled()
  })

  it('should render toggle options if provided', () => {
    const { getByText } = render(<ArrowSelector {...props} />)

    expect(getByText('Option 1')).toBeDefined()
    expect(getByText('Option 2')).toBeDefined()
  })

  it('should call onOptionChange when first option is clicked', () => {
    const { getByText } = render(<ArrowSelector {...props} />)

    fireEvent.click(getByText('Option 1'))
    expect(props.toggleOptions.onOptionChange).toHaveBeenCalledWith('Option 1')
  })

  it('should call onOptionChange when second option is clicked', () => {
    const { getByText } = render(<ArrowSelector {...props} />)

    fireEvent.click(getByText('Option 2'))
    expect(props.toggleOptions.onOptionChange).toHaveBeenCalledWith('Option 2')
  })
})
