import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { Collapse } from './Collapse'

describe('<Collapse/>', () => {
  it('should be render', () => {
    const { container } = render(<Collapse>Children</Collapse>)
    expect(container).toBeDefined()
  })
})
