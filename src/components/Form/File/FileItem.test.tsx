import { render } from '@testing-library/react'
import FileItem from './FileItem'

const defaultProps = {
  name: 'test-file.pdf',
  type: 'application/pdf',
  fileSize: 1024
}

describe('<FileItem>', () => {
  it('should render correctly', () => {
    const { getByRole } = render(<FileItem {...defaultProps} />)

    expect(getByRole('file-item')).toBeDefined()
  })

  it('displays file size when provided', () => {
    const { getByRole } = render(<FileItem {...defaultProps} />)

    expect(getByRole('file-size')).toBeDefined()
  })

  it('renders children components', () => {
    const { getByTestId } = render(
      <FileItem {...defaultProps}>
        <button data-testid="test-button">Action</button>
      </FileItem>
    )

    expect(getByTestId('test-button')).toBeInTheDocument()
  })
})
