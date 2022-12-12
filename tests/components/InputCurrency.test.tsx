import React from 'react'
import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { InputCurrency } from '../../src/components'

describe('<InputCurrency/>', () => {
    it('should be render', () => {
        const { container } = render(<InputCurrency />)
        expect(container).toBeDefined()
    })
})
