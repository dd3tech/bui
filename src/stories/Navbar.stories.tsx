import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Navbar from '../components/Navbar'
import Dropdown from '../components/Dropdown'
import { Button, Circle, Divider, Text } from '../components'
import {
  BellIcon,
  ClipboardCheckIcon,
  LockClosedIcon,
  UserAddIcon,
  UserCircleIcon
} from '@heroicons/react/outline'

export default {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof Navbar>

const Lendd3rLogo = () => (
  <figure className="block">
    <img
      style={{ height: 30 }}
      src="http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png"
    />
  </figure>
)

const Avatar = () => (
  <figure
    className="bg-gray-800 flex text-sm rounded-full w-12 h-12 overflow-hidden"
    style={{ width: 36, height: 36 }}
  >
    <img
      src="https://s.gravatar.com/avatar/ab077ce146c5bf3e8e17ce48cdb9b089?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Faf.png"
      className="rounded-full w-full object-cover"
    />
  </figure>
)

const Template: ComponentStory<typeof Navbar> = (args) => (
  <Navbar {...args}>
    <Navbar.Group gap="2">
      <Navbar.Collapse>
        <Navbar.CollapseToggle showIn="sm" className="pr-3" />

        <Navbar.CollapseContent title="Menu" activeColor="primary" gap="8">
          <Lendd3rLogo />

          <Navbar.Link to="#" isActive>
            Créditos
          </Navbar.Link>

          <Navbar.Link to="#">Proyectos</Navbar.Link>

          <Divider />

          <Button variant="secondary" className="w-36 text-sm rounded-lg">
            Nuevo Crédito
          </Button>
        </Navbar.CollapseContent>
      </Navbar.Collapse>

      <Navbar.Brand
        hiddenIn="sm"
        imgSrc="http://lendd3r-frontend-develop.s3-website-us-west-1.amazonaws.com/assets/lendder.53f51ab2.png"
      />
    </Navbar.Group>

    <Navbar.Content hiddenIn="sm" activeColor="primary" variant="underline">
      <Navbar.Link to="#" isActive>
        Créditos
      </Navbar.Link>

      <Navbar.Link to="#">Proyectos</Navbar.Link>
    </Navbar.Content>

    <Navbar.Content>
      <Circle
        width="36px"
        height="36px"
        backgroundColor="transparent"
        border="1px solid #D1D5DB"
      >
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-black focus:outline-none"
        >
          <BellIcon className="w-6 h-6 text-blue-700" />
        </button>
      </Circle>

      <Dropdown>
        <Dropdown.Trigger>
          <Navbar.Group gap="2">
            <Avatar />
            Usuario
          </Navbar.Group>
        </Dropdown.Trigger>

        <Dropdown.Menu>
          <div className="border-b-2 p-2">
            <div className="flex items-center pt-2 pl-2">
              <Text className="text-gray-600 text-xs font-semibold">
                {'workspace'.toUpperCase()}
              </Text>
            </div>
            <div className="mt-4 opacity-none rounded-lg flex gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
              <ClipboardCheckIcon
                className="text-gray-400"
                height={20}
                width={20}
              />{' '}
              Mis proyectos
            </div>
            <div className="flex opacity-none rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
              <UserAddIcon height={20} width={20} className="text-gray-400" />
              Agregar desarollador
            </div>
          </div>
          <div className="p-2">
            <Text className="text-gray-600 text-xs pt-2 pl-2 font-semibold">
              {'cuenta'.toUpperCase()}
            </Text>
            <div className="flex opacity-none rounded-lg mt-4 gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
              <UserCircleIcon
                height={20}
                width={20}
                className="text-gray-400"
              />
              Mi perfil
            </div>
            <span
              onClick={() => console.log('cerrar sesión')}
              className="flex rounded-lg gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              <LockClosedIcon
                className="text-gray-400"
                height={20}
                width={20}
              />
              Cerrar sesión
            </span>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar.Content>
  </Navbar>
)

export const navbarSticky = Template.bind({})

navbarSticky.args = {
  variant: 'sticky',
  shadow: 'base',
  className: 'custom-class'
}

export const navbarFloating = Template.bind({})

navbarFloating.args = {
  variant: 'floating',
  rounded: 'lg',
  shadow: 'base'
}
