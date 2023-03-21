import { it, describe, expect, vi } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'

import Switch from './Switch'
import { HomeIcon } from '@heroicons/react/outline'

const defaultProps = {
  text: 'Example',
  toggle: false,
  setToggle: vi.fn()
}

describe('<Switch/>', () => {
  beforeEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it('should be render', () => {
    const { container } = render(<Switch {...defaultProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('should render with a switch toggle', () => {
    const { getByTestId } = render(<Switch {...defaultProps} />)
    expect(getByTestId('switch-toggle')).toBeDefined()
  })

  it('should render with a prop text', () => {
    const { getByText } = render(<Switch {...defaultProps} />)
    expect(getByText('Example')).toBeDefined()
  })

  it('when we click on the switch should change state', () => {
    const { getByTestId } = render(<Switch {...defaultProps} />)
    const sToggle = getByTestId('switch-toggle')

    fireEvent.click(sToggle)

    expect(defaultProps.setToggle).toHaveBeenCalled()
    expect(defaultProps.setToggle).toHaveBeenCalledTimes(1)
  })

  describe('prop: toggle', () => {
    it('is false, should render with gray color', () => {
      const { getByTestId } = render(<Switch {...defaultProps} />)

      const switchFather = getByTestId('switch-toggle')
      const switchChildren = switchFather.firstChild as HTMLDivElement

      expect(switchFather.className).toContain('bg-gray-300')
      expect(switchChildren.className).toContain('bg-white')
    })

    it('is true, should render with blue color', () => {
      const { getByTestId } = render(<Switch {...defaultProps} toggle={true} />)

      const switchFather = getByTestId('switch-toggle')
      const switchChildren = switchFather.firstChild as HTMLDivElement

      expect(switchFather.className).toContain('bg-blue-100')
      expect(switchChildren.className).toContain('bg-blue')
    })
  })

  it('should be render with custom icon', () => {
    const { getByTestId } = render(
      <Switch
        {...defaultProps}
        customIcon={<HomeIcon data-testid="homeIcon" />}
      />
    )

    expect(getByTestId('homeIcon')).toBeDefined()
  })
})
