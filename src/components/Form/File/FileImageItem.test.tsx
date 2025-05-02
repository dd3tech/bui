import { vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import FileImageItem from './FileImageItem'

const defaultProps = {
  name: 'image.jpg',
  type: 'image/jpeg',
  src: 'https://example.com/image.jpg',
  title: 'Test Image',
  description: 'This is a test image description',
  onChangeTitle: vi.fn(),
  onChangeDescription: vi.fn()
}

describe('<FileImageItem>', () => {
  it('renders component correctly', () => {
    const { getByRole } = render(<FileImageItem {...defaultProps} />)

    expect(getByRole('file-item-image')).toBeDefined()
  })

  it('displays the image with correct src', () => {
    const { getByRole } = render(<FileImageItem {...defaultProps} />)
    const image = getByRole('file-image')

    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg')
  })

  it('calls onChangeTitle when title input changes', () => {
    const { getByDisplayValue } = render(<FileImageItem {...defaultProps} />)
    const titleInput = getByDisplayValue('Test Image')

    fireEvent.change(titleInput, {
      target: { value: 'Updated Title', name: 'title' }
    })

    expect(defaultProps.onChangeTitle).toHaveBeenCalled()
    expect(getByDisplayValue('Updated Title')).toBeDefined()
  })

  it('calls onChangeDescription when description input changes', () => {
    const { getByDisplayValue } = render(<FileImageItem {...defaultProps} />)
    const descriptionInput = getByDisplayValue(
      'This is a test image description'
    )

    fireEvent.change(descriptionInput, {
      target: { value: 'Updated description', name: 'description' }
    })

    expect(defaultProps.onChangeDescription).toHaveBeenCalled()
    expect(getByDisplayValue('Updated description')).toBeDefined()
  })

  it('displays character count for description', () => {
    const { getByRole, getByDisplayValue } = render(
      <FileImageItem {...defaultProps} />
    )
    const counter = getByRole('file-description-length')
    const descriptionInput = getByDisplayValue(
      'This is a test image description'
    )

    fireEvent.change(descriptionInput, {
      target: { value: 'Short', name: 'description' }
    })

    expect(counter).toHaveTextContent('5/100')
  })
})
