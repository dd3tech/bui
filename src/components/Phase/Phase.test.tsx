import { describe, afterEach, it, expect } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { CheckCircleIcon } from '@heroicons/react/outline'

import Phase, { IPhaseProps } from './Phase'

const props: IPhaseProps = {
  title: 'Title phase',
  variant: 'phases',
  textTag: 'Pending',
  status: 'default'
}

const renderComponent = (customProps?: Partial<IPhaseProps>) => {
  const mergedProps = { ...props, ...customProps }
  return render(<Phase {...mergedProps} />)
}

describe('<Phase/>', () => {
  afterEach(cleanup)

  it('should render with default props', () => {
    const { container } = renderComponent()
    expect(container.firstChild).toBeInTheDocument()
  })

  it('should render phases variant correctly', () => {
    const customProps: Partial<IPhaseProps> = {
      title: 'Custom Title',
      numberPhase: 1,
      status: 'completed',
      textTag: 'Completed',
      icon: CheckCircleIcon
    }
    const { getByText, getByTestId } = renderComponent(customProps)

    expect(getByTestId('badge-icon')).toBeInTheDocument()
    expect(getByText('1.')).toBeInTheDocument()
    expect(getByText('Custom Title')).toBeInTheDocument()
    expect(getByText('Completed')).toBeInTheDocument()
  })

  it('should render status variant correctly', () => {
    const customProps: Partial<IPhaseProps> = {
      variant: 'status',
      subtitle: 'Subtitle phase',
      status: 'active',
      textTag: 'Pending'
    }
    const { getByText } = renderComponent(customProps)

    expect(getByText('Title phase')).toBeInTheDocument()
    expect(getByText('Subtitle phase')).toBeInTheDocument()
    expect(getByText('Pending')).toBeInTheDocument()
  })

  it('should render quarters variant correctly', () => {
    const customProps: Partial<IPhaseProps> = {
      variant: 'quarters',
      listData: [
        { label: 'Item 1', completed: true },
        { label: 'Item 2', completed: false }
      ],
      icon: CheckCircleIcon
    }
    const { getByText, getByTestId } = renderComponent(customProps)

    expect(getByText('Title phase')).toBeInTheDocument()
    expect(getByTestId('badge-icon')).toBeInTheDocument()
    expect(getByText('Item 1')).toBeInTheDocument()
    expect(getByText('Item 2')).toBeInTheDocument()
  })

  it('should not render Tag component for quarters variant', () => {
    const customProps: Partial<IPhaseProps> = {
      variant: 'quarters',
      textTag: 'Custom Tag'
    }
    const { queryByText } = renderComponent(customProps)

    expect(queryByText('Custom Tag')).toBeNull()
  })

  it('should use the default style when the variant is "phases" and the state is not defined in the object values', () => {
    const customProps: Partial<IPhaseProps> = {
      variant: 'phases',
      status: 'success'
    }
    const { container } = renderComponent(customProps)

    expect(container.firstChild).toHaveClass(
      'p-2 bg-gray-50 ring-2 ring-gray-300 text-gray-700'
    )
  })
})
