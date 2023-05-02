import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { twAlignItemsValues, twJustifyContentValues } from 'interfaces/types'
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

  it('should be render with differents alignItems', () => {
    const { getByRole, rerender } = render(<Flex alignItems="center" />)
    const flex = getByRole('flex')

    expect(flex.className).toContain('items-center')

    twAlignItemsValues.forEach((key) => {
      rerender(<Flex alignItems={key} />)
      expect(flex.className).toContain(`items-${key}`)
    })
  })

  it('should be render with differents justifyContent', () => {
    const { getByRole, rerender } = render(<Flex justifyContent="between" />)
    const flex = getByRole('flex')

    expect(flex.className).toContain('justify-between')

    twJustifyContentValues.forEach((key) => {
      rerender(<Flex justifyContent={key} />)
      expect(flex.className).toContain(`justify-${key}`)
    })
  })
})
