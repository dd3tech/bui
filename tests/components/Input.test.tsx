import React from 'react'
import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { Input } from '../../src/components'

describe('<Input/>', () => {
    it('should be render', () => {
        const { container } = render(<Input />)
        expect(container).toBeDefined()
    })
})
