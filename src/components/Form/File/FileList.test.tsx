import { render } from '@testing-library/react'
import FileList from './FileList'

describe('<FileList>', () => {
  it('renders component correctly', () => {
    const { getByRole } = render(<FileList />)

    expect(getByRole('file-list')).toBeDefined()
  })

  it('renders header when provided', () => {
    const { getByRole } = render(
      <FileList header={<h2>File List Header</h2>} />
    )

    expect(getByRole('file-list-header')).toBeDefined()
  })

  it('renders children components', () => {
    const { getByRole } = render(
      <FileList>
        <div data-testid="child-component">Child Component</div>
      </FileList>
    )

    expect(getByRole('file-list-content')).toBeDefined()
  })
})
