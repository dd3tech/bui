import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import { Navbar } from './Navbar'

describe('<Navbar/>', () => {
    it('should be render', () => {
        const { container } = render(<Navbar logoUrl="" />)
        expect(container).toBeDefined()
    })
})
