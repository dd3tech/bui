import { describe, afterEach, it, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { CheckCircleIcon } from '@heroicons/react/solid'

import Callout, { CalloutProps } from './Callout'

const props: CalloutProps = {
  title: 'All systems operational',
  description: 'All systems are operational and functioning as expected.',
  icon: CheckCircleIcon,
  variant: 'success'
}

const renderComponent = () => {
  return render(<Callout {...props} />)
}

describe('<Callout/>', () => {
  afterEach(cleanup)

  it('should be render', () => {
    const { container } = renderComponent()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render the title', () => {
    const { getByText } = renderComponent()
    expect(getByText(props.title)).toBeInTheDocument()
  })

  it('should render the description', () => {
    const { getByText } = renderComponent()
    expect(getByText(props.description as string)).toBeInTheDocument()
  })

  describe('prop: icon', () => {
    it('should render the icon', () => {
      const { getByTestId } = renderComponent()
      expect(getByTestId('callout-icon')).toBeInTheDocument()
    })

    it('should not render the icon', () => {
      props.icon = undefined
      const { queryByTestId } = renderComponent()
      expect(queryByTestId('callout-icon')).not.toBeInTheDocument()
    })
  })

  describe('prop: variant', () => {
    it('should render the correct variant', () => {
      const { container } = renderComponent()

      // checking if the classes are being applied
      expect(container.firstChild).toHaveClass('bg-green-50')
      expect(container.firstChild).toHaveClass('border-green-500')
      expect(container.firstChild).toHaveClass('text-green-700')
    })

    it('should render with the differents variants', () => {
      props.variant = 'info'
      const { container, rerender } = renderComponent()

      // checking if the classes are being applied
      expect(container.firstChild).toHaveClass('bg-blue-50')
      expect(container.firstChild).toHaveClass('border-blue-500')
      expect(container.firstChild).toHaveClass('text-blue-700')

      props.variant = 'warning'
      rerender(<Callout {...props} />)

      // checking if the classes are being applied
      expect(container.firstChild).toHaveClass('bg-yellow-50')
      expect(container.firstChild).toHaveClass('border-yellow-500')
      expect(container.firstChild).toHaveClass('text-yellow-700')

      props.variant = 'error'
      rerender(<Callout {...props} />)

      // checking if the classes are being applied
      expect(container.firstChild).toHaveClass('bg-red-50')
      expect(container.firstChild).toHaveClass('border-red-500')
      expect(container.firstChild).toHaveClass('text-red-700')
    })
  })
})
