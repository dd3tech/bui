import { it, describe } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import Dropdown from './Dropdown'
import DropdownMenu from './DropdownMenu'
import DropdownTrigger from './DropdownTrigger'

describe('<Navbar/>', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(
      <Dropdown>
        <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">Content</DropdownMenu>
      </Dropdown>
    )
  })

  afterEach(() => cleanup())

  it('should be render', () => {
    const { container } = renderResult
    expect(container).toBeDefined()
  })

  it('props: disableAnimation', () => {
    const { getByTestId } = renderResult
    const content = getByTestId('menu')

    fireEvent.click(getByTestId('trigger'))

    expect(content.parentElement?.style.transform).toContain(
      'scale(1) translateY(0)'
    )
    expect(content.parentElement?.style.transition).toContain(
      'all 0.2s ease-out'
    )

    renderResult.rerender(
      <Dropdown disableAnimation>
        <DropdownTrigger data-testid="trigger">Trigger</DropdownTrigger>
        <DropdownMenu data-testid="menu">Content</DropdownMenu>
      </Dropdown>
    )

    expect(content.parentElement?.style.transform).not.toContain(
      'scale(1) translateY(0)'
    )
    expect(content.parentElement?.style.transition).not.toContain(
      'all 0.2s ease-out'
    )
  })
})
