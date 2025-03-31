import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AsideModalV2, { AsideModalProps } from './AsideModalV2'

vi.mock('hooks/useModalManager', () => ({
  useModalManager: vi.fn().mockImplementation(({ open }) => ({
    isOpen: open,
    handleModalClose: vi.fn()
  }))
}))

vi.mock('common/DynamicHeroIcon', () => ({
  default: ({ icon }: { icon: string }) => (
    <div data-testid="dynamic-icon">{icon}</div>
  )
}))

vi.mock('components/Filters', () => ({
  FilterSearch: ({ label }: { label: string }) => (
    <div data-testid="filter-search">{label}</div>
  )
}))

vi.mock('components/Tabs', () => ({
  TabGroup: ({ children, onChange, value }: any) => (
    <div data-testid="tab-group" data-value={value}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: () => onChange(index)
        })
      )}
    </div>
  ),
  Tab: ({ label, onClick }: any) => (
    <button data-testid="tab" onClick={onClick}>
      {label}
    </button>
  ),
  TabPanel: ({ children, value, index }: any) => (
    <div data-testid="tab-panel" hidden={value !== index}>
      {children}
    </div>
  )
}))

describe('AsideModalV2', () => {
  const mockOnClose = vi.fn()

  const defaultProps: AsideModalProps = {
    title: 'Test Modal',
    open: true,
    onClose: mockOnClose,
    children: <div>Modal Content</div>
  }

  const renderModal = (props: Partial<AsideModalProps> = {}) => {
    return render(<AsideModalV2 {...defaultProps} {...props} />)
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('should render the modal when open is true', () => {
      renderModal()
      expect(screen.getByRole('aside-modal')).toBeInTheDocument()
    })

    it('should not display the modal content when open is false', () => {
      renderModal({ open: false })
      const aside = screen.getByRole('aside-modal')
      expect(aside).toHaveClass('translate-x-full')
    })

    it('should display the title', () => {
      renderModal()
      expect(screen.getByText('Test Modal')).toBeInTheDocument()
    })

    it('should render children content', () => {
      renderModal()
      expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('should render close button', () => {
      renderModal()
      expect(screen.getByTestId('close-button')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    const searchProps = {
      label: 'Search',
      placeholder: 'Type to search...',
      onChange: () => console.log('searching...'),
      value: '',
      handleClearSearch: () => console.log('searching...')
    }

    it('should render search component', () => {
      renderModal({ search: searchProps })
      expect(screen.getByTestId('filter-search')).toHaveTextContent('Search')
    })
  })
})
