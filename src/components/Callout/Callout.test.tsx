import { describe, afterEach, it, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { CheckCircleIcon } from '@heroicons/react/solid'

import Callout, { CalloutProps, calloutVariants } from './Callout'

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

  describe('prop: description', () => {
    it('should render the description', () => {
      const { getByText } = renderComponent()
      expect(getByText(props.description as string)).toBeInTheDocument()
    })

    it('should not render the description', () => {
      const copyProps = Object.freeze({ ...props })
      props.description = undefined

      const { queryByText } = renderComponent()

      expect(
        queryByText(copyProps.description as string)
      ).not.toBeInTheDocument()
    })
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
    it('should render the default variant', () => {
      const { container } = renderComponent()

      expect(container.firstChild).toHaveClass(calloutVariants.success)
    })

    it('should render with the differents variants', () => {
      const { container, rerender } = renderComponent()

      // checking if variant styles are being applied
      const availableVariants = Object.keys(calloutVariants)
      availableVariants.forEach((variant) => {
        props.variant = variant as CalloutProps['variant']
        rerender(<Callout {...props} />)
        expect(container.firstChild).toHaveClass(calloutVariants[variant])
      })
    })
  })
})
