import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import InputCurrency from './InputCurrency'

describe('<InputCurrency/>', () => {
    it('should be render', () => {
        const { container } = render(<InputCurrency />)
        expect(container).toBeDefined()
    })
})
