import { render, fireEvent } from '@testing-library/react'
import FileItemDropdown from './FileItemDropdown'

describe('FileItemDropdown', () => {
  it('renders the icon in the trigger', () => {
    const { getByRole } = render(
      <FileItemDropdown icon="s">
        <div>Dropdown Content</div>
      </FileItemDropdown>
    )

    expect(getByRole('trigger-button')).toBeDefined()
  })

  it('shows dropdown content when clicked', () => {
    const { getByRole, queryByTestId, getByTestId } = render(
      <FileItemDropdown icon="s">
        <div data-testid="dropdown-content">Dropdown Content</div>
      </FileItemDropdown>
    )

    expect(queryByTestId('dropdown-content')).not.toBeVisible()

    fireEvent.click(getByRole('trigger-button'))

    expect(getByTestId('dropdown-content')).toBeVisible()
  })
})
