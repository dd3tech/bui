import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Text from '../Typography/Text'
import Anchor from './Anchor'

describe('<Anchor/>', () => {
  it('should be render correctly', () => {
    const { container } = render(<Anchor />)
    expect(container.firstChild).toBeDefined()
  })

  describe('anchor', () => {
    it('by default should render with <a/>', () => {
      const { container } = render(<Anchor />)
      const anchor = container.firstChild as HTMLAnchorElement
      expect(anchor.tagName).toBe('A')
    })

    it('prop to works correctly', () => {
      const { container } = render(<Anchor to="google.com" />)
      const anchor = container.firstChild as HTMLAnchorElement
      expect(anchor.getAttribute('href')).toBe('google.com')
    })
  })

  describe('linkComponent', () => {
    it('should be render with a custom component', () => {
      const { container } = render(<Anchor as={Text} />)
      const anchor = container.firstChild as HTMLAnchorElement
      expect(anchor.tagName).toBe('SPAN')
    })

    it('prop to should be works correctly with custom component', () => {
      const { container } = render(<Anchor to="google.com" as={Text} />)
      const anchor = container.firstChild as HTMLAnchorElement
      expect(anchor.getAttribute('to')).toBe('google.com')
    })
  })
})
