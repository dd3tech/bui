import { render } from '@testing-library/react'
import { it, describe } from 'vitest'
import MailIcon from '@heroicons/react/outline/MailIcon'
import ShapeButton from './ShapeButton'

const defaultProps = {
  height: '3rem'
}

describe('<BaseCircleButton />', () => {
  it('should be render SquareButton', () => {
    const { container } = render(<ShapeButton.SquareButton {...defaultProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('should be render CircleButton', () => {
    const { container } = render(<ShapeButton.CircleButton {...defaultProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('should be render CircleButton with an Icon', () => {
    const { container } = render(
      <ShapeButton.CircleButton
        {...defaultProps}
        Icon={() => <MailIcon id="MailIcon" />}
      />
    )
    const icon = container
      .querySelector('#cell-icon')
      ?.querySelector('#MailIcon')
    expect(icon).not.toBeNull()
  })

  it('should be render the BaseCircleButton with the specified width and height', () => {
    const { container } = render(
      <ShapeButton.BaseCircleButton {...defaultProps} width="3rem" />
    )
    expect(container.firstChild).toHaveStyle('width: 3rem')
    expect(container.firstChild).toHaveStyle('height: 3rem')
  })

  it('should be render the BaseCircleButton with the shadow sm', () => {
    const { container } = render(
      <ShapeButton.BaseCircleButton {...defaultProps} shadow="sm" />
    )
    expect(container.firstChild).toHaveClass('shadow-sm')
  })

  it('should be render the BaseCircleButton disabled', () => {
    const { container } = render(
      <ShapeButton.BaseCircleButton {...defaultProps} disabled={true} />
    )
    expect(container.firstChild).toHaveClass('text-gray-300')
  })

  it('should be render the BaseCircleButton selected', () => {
    const { container } = render(
      <ShapeButton.BaseCircleButton {...defaultProps} selected={true} />
    )
    expect(container.firstChild).toHaveClass('bg-blue-700 text-white')
  })
})
