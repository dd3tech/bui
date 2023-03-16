import { it, describe } from 'vitest'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { getActiveVariants } from './NavbarLink'
import { getActiveItemVariants } from './NavbarItem'
import NavbarWrapper from './NavbarWrapper.mock'

describe('<Navbar />', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(<NavbarWrapper />)
    })

    afterEach(() => cleanup())

    it('should be render', () => {
        const { container } = renderResult
        expect(container).toBeDefined()
    })

    it('should be render a brand with breakpoint sm', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('brand-hidden').className).toContain('sm:flex')
    })

    it('should be render a brand with image and title', () => {
        const { getByTestId } = renderResult
        const brand = getByTestId('brand-hidden')
        const img = brand.firstChild?.firstChild
        expect(img).not.toBeNull()
        expect(img).toHaveProperty('src', 'http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png')
        expect(brand).toContainHTML('Company')
    })

    it('should be render a brand without breakpoint', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('brand').className).not.toContain('sm:flex')
    })

    it('should be render a content with breakpoint sm', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('content-hidden').className).toContain('sm:flex')
    })

    it('should be render a content without breakpoint', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('content').className).not.toContain('sm:flex')
    })

    it('should be render a link highlight', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('link-highlight').className).toContain(getActiveVariants('highlight', 'red'))
    })

    it('should be render a link no active', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('link-noactive').className).toContain('text-base')
    })

    it('should be render a item highlight', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('item-highlight').className).toContain(getActiveItemVariants('highlight', 'red'))
    })

    it('should be render a item no active', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('item-noactive').className).toContain('text-base')
    })

    it('should show or hide correctly', () => {
        const { getByTestId, getByRole } = renderResult

        fireEvent.click(getByTestId('collapse-toggle'))
        expect(getByTestId('collapse-content').className).toContain('translate-x-0')

        fireEvent.click(getByRole('close'))
        expect(getByTestId('collapse-content').className).toContain('-translate-x-full')
    })

    describe('props gap and hiddenIn', () => {
        it('should be render a group with gap and hiddenIn', () => {
            const { getByTestId } = renderResult
            const group = getByTestId('group')
            expect(group.className).toContain('gap-1')
            expect(group.className).toContain('sm:flex')
        })

        it('should be not render a group with gap and hiddenIn', () => {
            const { getByTestId } = renderResult
            const group = getByTestId('sub-group')
            expect(group.className).not.toContain('gap-1')
            expect(group.className).not.toContain('sm:flex')
        })
    })
})
