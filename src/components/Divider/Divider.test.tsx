import { render } from '@testing-library/react'
import Divider, { getClassesDivider } from './Divider'

describe('<Divider/>', () => {
    it('should be render', () => {
        const { container } = render(<Divider />)
        expect(container).toBeDefined()
    })

    describe('variant full and orientation', () => {
        it('should be render with vertical orientation without margin', () => {
            const { container } = render(<Divider vertical variant="full" />)
            const hr = container.firstChild as HTMLHRElement
            expect(hr.className).not.toContain('mt-1 mb-1')
        })

        it('should be render with horizontal orientation without margin', () => {
            const { container } = render(<Divider variant="full" />)
            const hr = container.firstChild as HTMLHRElement
            expect(hr.className).not.toContain('ml-1 mr-1')
        })
    })

    describe('variant middle and orientation', () => {
        it('should be render with vertical orientation with margin', () => {
            const { container } = render(<Divider vertical />)
            const hr = container.firstChild as HTMLHRElement
            expect(hr.className).toContain('mt-1 mb-1')
        })

        it('should be render with horizontal orientation with margin', () => {
            const { container } = render(<Divider />)
            const hr = container.firstChild as HTMLHRElement
            expect(hr.className).toContain('ml-1 mr-1')
        })
    })

    it('should be render with a size large and a color light', () => {
        const { container } = render(<Divider size="large" light />)
        const hr = container.firstChild as HTMLHRElement
        const classes = getClassesDivider({ size: 'large', light: true })
        expect(hr.className).toContain(classes.size)
        expect(hr.className).toContain(classes.color)
    })
})
