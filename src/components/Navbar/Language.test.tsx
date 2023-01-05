import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { Language } from './Language'

describe('<Language/>', () => {
    it('should be render', () => {
        const { container } = render(<Language />)
        expect(container).toBeDefined()
    })
})
