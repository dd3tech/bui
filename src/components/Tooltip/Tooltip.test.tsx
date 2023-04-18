import { describe, it, afterEach, expect } from 'vitest'
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react'
import Tooltip from './Tooltip'
import Button from '../Buttons/Button'
import { act } from 'react-dom/test-utils'

const defaultProps = {
  content: 'Im tooltip',
  children: <Button role="button">Im button</Button>
}

const renderComponent = (withAdornments?: boolean) => {
  const props = withAdornments
    ? {
        ...defaultProps,
        startAdornment: <span>👋</span>,
        endAdornment: <span>🌎</span>
      }
    : defaultProps

  return render(<Tooltip {...props} />)
}

describe('Tooltip Component', () => {
  afterEach(cleanup)

  it('should render tooltip on mouse enter', async () => {
    const { getByRole, getByText } = renderComponent()

    const button = getByRole('button')
    act(() => {
      fireEvent.mouseEnter(button)
    })

    await waitFor(() => {
      const tooltip = getByRole('tooltip-content')
      expect(getByText(defaultProps.content)).toBeInTheDocument()
      expect(tooltip.textContent).toBe(defaultProps.content)
    })
  })

  it('should hide tooltip on mouse leave', async () => {
    const { getByRole, queryByText } = renderComponent()

    const button = getByRole('button')

    fireEvent.mouseEnter(button)
    fireEvent.mouseLeave(button)

    await waitFor(() => {
      expect(queryByText(defaultProps.content)).not.toBeInTheDocument()
    })
  })

  it('should show start and end adornments', async () => {
    const { getByRole, getByText } = renderComponent(true)

    const button = getByRole('button')

    fireEvent.mouseEnter(button)

    await waitFor(() => {
      expect(getByText('👋')).toBeInTheDocument()
      expect(getByText(defaultProps.content)).toBeInTheDocument()
      expect(getByText('🌎')).toBeInTheDocument()
    })
  })
})
