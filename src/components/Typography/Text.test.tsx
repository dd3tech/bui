import { it, describe } from 'vitest'
import { render } from '@testing-library/react'

import Text, { TextProps } from './Text'

const defProps: TextProps = {}

describe('<Text/>', () => {
    it('should be render correctly', () => {
        const { container } = render(<Text {...defProps} />)
        expect(container).toBeDefined()
    })
})
