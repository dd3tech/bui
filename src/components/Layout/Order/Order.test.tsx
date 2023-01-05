import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Order from './Order'

describe('<Order/>', () => {
    it('should be render', () => {
        const { container } = render(<Order order="2" />)
        expect(container).toBeDefined()
    })

    it('should render with the order in className', () => {
        const { container } = render(<Order order="2" />)
        const order = container.firstChild as HTMLDivElement
        expect(order.className).toContain('order-2')
    })
})
