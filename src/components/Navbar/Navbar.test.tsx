import { it, describe } from 'vitest'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Navbar from './Navbar'
import NavbarCollapse from './NavbarCollapse/NavbarCollapse'
import NavbarCollapseToggle from './NavbarCollapse/NavbarCollapseToggle'
import NavbarCollapseContent from './NavbarCollapse/NavbarCollapseContent'
import NavbarLink, { getActiveVariants } from './NavbarLink'
import NavbarContent from './NavbarContent'
import NavbarBrand from './NavbarBrand'

describe('<Navbar/>', () => {
    let renderResult: RenderResult

    beforeEach(() => {
        renderResult = render(
            <Navbar>
                <NavbarCollapse>
                    <NavbarCollapseToggle data-testid="collapse-toggle" showIn="sm" className="pr-3" />

                    <NavbarCollapseContent data-testid="collapse-content" title="Menu" activeColor="primary" gap="8">
                        CollapseContent
                    </NavbarCollapseContent>
                </NavbarCollapse>

                <NavbarBrand data-testid="brand-hidden" hiddenIn="sm">
                    Logo
                </NavbarBrand>

                <NavbarBrand data-testid="brand">Logo</NavbarBrand>

                <NavbarContent data-testid="content-hidden" hiddenIn="sm" activeColor="primary" variant="underline">
                    <NavbarLink to="#" isActive>
                        Créditos
                    </NavbarLink>
                </NavbarContent>

                <NavbarContent data-testid="content">
                    <NavbarLink to="#" isActive>
                        Créditos
                    </NavbarLink>
                    <NavbarLink data-testid="link-noactive" to="#">
                        Créditos
                    </NavbarLink>
                </NavbarContent>

                <NavbarContent activeColor="danger" variant="highlight">
                    <NavbarLink data-testid="link-highlight" to="#" isActive>
                        Créditos
                    </NavbarLink>
                </NavbarContent>
            </Navbar>
        )
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
        expect(getByTestId('link-highlight').className).not.toContain(getActiveVariants('highlight', 'danger'))
    })

    it('should be render a link no active', () => {
        const { getByTestId } = renderResult
        expect(getByTestId('link-noactive').className).toContain('text-base')
    })

    it('should show or hide correctly', () => {
        const { getByTestId, getByRole } = renderResult

        fireEvent.click(getByTestId('collapse-toggle'))
        expect(getByTestId('collapse-content').className).toContain('translate-x-0')

        fireEvent.click(getByRole('close'))
        expect(getByTestId('collapse-content').className).toContain('-translate-x-full')
    })
})
