import { it, describe, expect, vi, beforeEach } from 'vitest'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { EyeIcon } from '@heroicons/react/outline'
import TopPage from './TopPage'

const defaultProps = {
  title: 'Title',
  description: 'Description',
  lastUpdate: {
    translation: 'en' as const,
    date: new Date('2023-12-12T00:00:00')
  },
  callToActionsButtons: [
    {
      label: 'Action 1',
      onClick: vi.fn(),
      icon: <EyeIcon />,
      variant: 'primary' as const
    }
  ],
  callToActionIcon: {
    titleIcon: <EyeIcon />,
    onClick: vi.fn(),
    isSelected: false
  },
  tabs: {
    value: 0,
    setValue: vi.fn(),
    items: [{ label: 'Tab 1' }, { label: 'Tab 2' }]
  },
  children: <p>Test children</p>
}

beforeEach(() => {
  cleanup()
  vi.resetAllMocks()
})

describe('<TopPage />', () => {
  it('should render', () => {
    const { container } = render(<TopPage {...defaultProps} />)
    expect(container.firstChild).toBeDefined()
  })

  it('should render the title and description', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)
    expect(getByText('Title')).toBeDefined()
    expect(getByText('Description')).toBeDefined()
  })

  it('should render last update', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)

    expect(getByText('12-Dec-2023')).toBeDefined()
  })

  it('should render call to action buttons', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)
    expect(getByText('Action 1')).toBeDefined()
  })

  it('should call the onClick event of the action button', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)
    const button = getByText('Action 1')
    fireEvent.click(button)
    expect(defaultProps.callToActionsButtons[0].onClick).toHaveBeenCalled()
  })

  it('should call the onClick event of the action icon', () => {
    const { getByTestId } = render(<TopPage {...defaultProps} />)
    const iconButton = getByTestId('action-icon')

    fireEvent.click(iconButton)
    expect(defaultProps.callToActionIcon.onClick).toHaveBeenCalled()
  })

  it('should render tabs and handle tab switching', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)
    const tab1 = getByText('Tab 1')
    const tab2 = getByText('Tab 2')

    expect(tab1).toBeDefined()
    expect(tab2).toBeDefined()
    fireEvent.click(tab2)
    expect(defaultProps.tabs.setValue).toHaveBeenCalledWith(1)
  })

  it('should render custom content for each tab', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)

    expect(getByText('Tab 1')).toBeDefined()
    fireEvent.click(getByText('Tab 2'))
    expect(getByText('Tab 2')).toBeDefined()
  })

  it('should render children content', () => {
    const { getByText } = render(<TopPage {...defaultProps} />)
    expect(getByText('Test children')).toBeDefined()
  })
})
