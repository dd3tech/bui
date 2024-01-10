import { it, describe } from 'vitest'
import { render } from '@testing-library/react'
import { CheckCircleIcon } from '@heroicons/react/outline'

import Tag from './Tag'

const containerRole = 'container-tag'

describe('<Tag/>', () => {
  it('should render properly', () => {
    const { container } = render(<Tag />)

    expect(container.firstChild).toBeDefined()
  })

  it('correctly applies the className prop', () => {
    const { getByRole } = render(
      <Tag variant="primary" className="text-error" />
    )

    expect(getByRole(containerRole).className).toContain('text-error')
  })

  it('should render the icon', () => {
    const { getByTestId } = render(
      <Tag variant="primary" className="text-error" icon={CheckCircleIcon} />
    )

    expect(getByTestId('tag-icon')).toBeInTheDocument()
  })

  it('should not render the icon in component', () => {
    const { queryByTestId } = render(
      <Tag variant="primary" className="text-error" />
    )

    expect(queryByTestId('tag-icon')).not.toBeInTheDocument()
  })

  describe('renders with different variants', () => {
    it('applies className for the warning variant', () => {
      const { getByRole } = render(<Tag variant="warning" />)

      expect(getByRole(containerRole).className).toContain(
        'bg-yellow-50 text-warning font-medium'
      )
    })

    it('applies className for the success variant', () => {
      const { getByRole } = render(<Tag variant="success" />)

      expect(getByRole(containerRole).className).toContain(
        'bg-green-50 text-green-700 font-medium'
      )
    })

    it('applies className for the primary variant', () => {
      const { getByRole } = render(<Tag variant="primary" />)

      expect(getByRole(containerRole).className).toContain(
        'bg-blue-100 text-blue-700 font-medium'
      )
    })

    it('applies className for the secondary variant', () => {
      const { getByRole } = render(<Tag variant="secondary" />)

      expect(getByRole(containerRole).className).toContain(
        'bg-gray-50 text-gray-700 font-medium'
      )
    })

    it('applies className for the warning variant with fill', () => {
      const { getByRole } = render(<Tag variant="warning" fill={true} />)

      expect(getByRole(containerRole).className).toContain(
        'bg-yellow-600 text-yellow-50 font-semibold'
      )
    })

    it('applies className for the success variant with fill', () => {
      const { getByRole } = render(<Tag variant="success" fill={true} />)

      expect(getByRole(containerRole).className).toContain(
        'bg-green-500 text-green-50 font-semibold'
      )
    })

    it('applies className for the primary variant with fill', () => {
      const { getByRole } = render(<Tag variant="primary" fill={true} />)

      expect(getByRole(containerRole).className).toContain(
        'bg-blue-600 text-blue-50 font-semibold'
      )
    })

    it('applies className for the secondary variant with fill', () => {
      const { getByRole } = render(<Tag variant="secondary" fill={true} />)

      expect(getByRole(containerRole).className).toContain(
        'bg-gray-200 text-gray-600 font-semibold'
      )
    })
  })

  describe('icon size based on variant and specified size', () => {
    it('renders icon with correct size for different variants and sizes', () => {
      const { container, rerender } = render(
        <Tag variant="primary" icon={CheckCircleIcon} fontSize="medium" />
      )
      let iconElement = container.querySelector('svg')
      const sizeClassForMedium = 'w-4 h-4'

      expect(iconElement).toHaveClass(sizeClassForMedium)

      rerender(
        <Tag variant="primary" icon={CheckCircleIcon} fontSize="large" />
      )
      iconElement = container.querySelector('svg')
      const sizeClassForLarge = 'w-5 h-5'

      expect(iconElement).toHaveClass(sizeClassForLarge)
    })
  })

  it('applies default props when not provided', () => {
    const { getByRole } = render(<Tag />)
    const containerElement = getByRole(containerRole)
    const defaultVariantClass = 'bg-blue-100 text-blue-700 font-medium'
    const defaultBaseClasses =
      'inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-md'

    expect(containerElement.className).toContain(defaultVariantClass)
    expect(containerElement.className).toContain(defaultBaseClasses)
  })
})
