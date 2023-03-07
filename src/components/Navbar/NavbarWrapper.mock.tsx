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
            <NavbarCollapseToggle data-testid="collapse-toggle" showIn="sm" className="pr-3" />

            <NavbarCollapseContent data-testid="collapse-content" title="Menu" activeColor="primary" gap="8">
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

        <NavbarContent data-testid="content-hidden" hiddenIn="sm" activeColor="primary" variant="underline">
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

        <NavbarContent activeColor="danger" variant="highlight">
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

export default NavbarWrapper
