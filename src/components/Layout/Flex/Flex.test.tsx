import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Flex from './Flex'

describe('<Flex/>', () => {
  it('should be render correctly', () => {
    const { getByRole } = render(<Flex />)
    expect(getByRole('flex')).toBeDefined()
  })
  it('should be render with a children', () => {
    const text = 'Flex component'
    const { getByText } = render(<Flex>{text}</Flex>)
    expect(getByText(text)).toBeDefined()
  })
  it('should be render with a flex className', () => {
    const { getByRole } = render(<Flex />)
    expect(getByRole('flex').classList.contains('flex')).toBeDefined()
  })
  it('should be render with a custom className', () => {
    const { getByRole } = render(<Flex className="bg-pink-400" />)
    expect(getByRole('flex').classList.contains('bg-pink-400')).toBeDefined()
  })
})
