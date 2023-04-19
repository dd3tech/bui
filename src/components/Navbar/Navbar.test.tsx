import { it, describe } from 'vitest'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult
} from '@testing-library/react'
import Navbar from './Navbar'
import NavbarBrand from './NavbarBrand'
import NavbarCollapse from './NavbarCollapse/NavbarCollapse'
import NavbarCollapseToggle from './NavbarCollapse/NavbarCollapseToggle'
import NavbarCollapseContent from './NavbarCollapse/NavbarCollapseContent'
import NavbarContent from './NavbarContent'
import NavbarGroup from './NavbarGroup'
import NavbarItem from './NavbarItem'
import NavbarLink from './NavbarLink'

const NavbarWrapper = () => (
  <Navbar>
    <NavbarCollapse>
      <NavbarCollapseToggle
        data-testid="collapse-toggle"
        showIn="sm"
        className="pr-3"
      />

      <NavbarCollapseContent
        data-testid="collapse-content"
        title="Menu"
        activeColor="primary"
        gap="8"
      >
        CollapseContent
      </NavbarCollapseContent>
    </NavbarCollapse>

    <NavbarBrand
      data-testid="brand-hidden"
      hiddenIn="sm"
      imgSrc="http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png"
      name="Company"
    />

    <NavbarBrand data-testid="brand">Logo</NavbarBrand>

    <NavbarContent
      data-testid="content-hidden"
      hiddenIn="sm"
      activeColor="primary"
      variant="underline"
    >
      <NavbarLink to="#" isActive>
        Créditos
      </NavbarLink>
      <NavbarItem data-testid="item-underline" isActive>
        Créditos
      </NavbarItem>
    </NavbarContent>

    <NavbarContent data-testid="content">
      <NavbarLink to="#" isActive>
        Créditos
      </NavbarLink>
      <NavbarLink data-testid="link-noactive" to="#">
        Créditos
      </NavbarLink>
      <NavbarItem data-testid="item-noactive">Créditos</NavbarItem>
    </NavbarContent>

    <NavbarContent activeColor="error" variant="highlight">
      <NavbarLink data-testid="link-highlight" to="#" isActive>
        Créditos
      </NavbarLink>
      <NavbarItem data-testid="item-highlight" isActive>
        Créditos
      </NavbarItem>
    </NavbarContent>

    <NavbarGroup data-testid="group" gap="1" hiddenIn="sm">
      <NavbarItem isActive>Créditos</NavbarItem>
      <NavbarGroup data-testid="sub-group">
        <NavbarItem>Example</NavbarItem>
      </NavbarGroup>
    </NavbarGroup>
  </Navbar>
)

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
    expect(img).toHaveProperty(
      'src',
      'http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png'
    )
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
    expect(getByTestId('item-highlight')?.getAttribute('style')).toContain(
      'color: red;'
    )
  })

  it('should be render a link no active', () => {
    const { getByTestId } = renderResult
    expect(getByTestId('link-noactive').className).toContain('text-base')
  })

  it('should be render a item highlight', () => {
    const { getByTestId } = renderResult

    expect(getByTestId('item-highlight')?.getAttribute('style')).toContain(
      'color: red;'
    )
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
    expect(getByTestId('collapse-content').className).toContain(
      '-translate-x-full'
    )
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
