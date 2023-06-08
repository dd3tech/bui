import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SideBarComponent from '../components/SideBar/SideBar'
import { HomeIcon } from '@heroicons/react/outline'
import { ExclamationIcon } from '@heroicons/react/solid'
import Flex from '../components/Layout/Flex'

export default {
  title: 'Layout/SideBar',
  component: SideBarComponent,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SideBarComponent>

const subItems = {
  1: {
    title: 'SubItem 1',
    active: true,
    goTo: () => console.log('subItem 1.1')
  },
  2: {
    title: 'SubItem 2',
    active: false,
    goTo: () => console.log('subItem 1.2')
  },
  3: {
    title: 'SubItem 3',
    active: false,
    goTo: () => console.log('subItem 1.3')
  }
}

const sideBarList = [
  {
    title: 'Information 1',
    active: true,
    isOpen: true,
    icon: <HomeIcon />,
    subItems: subItems,
    badge: 4
  },
  {
    title: 'Information 2',
    active: false,
    isOpen: false,
    subItems: subItems,
    badge: 4
  },
  {
    title: 'Information 3',
    active: false,
    isOpen: false,
    disabled: true,
    subItems: subItems,
    badge: <ExclamationIcon className="w-4 h-4 text-yellow-400" />
  },
  {
    title: 'Information 4',
    active: false,
    isOpen: false,
    goTo: () => console.log('Item 4')
  }
]

const Template: ComponentStory<typeof SideBarComponent> = (args) => {
  return (
    <Flex style={{ height: 'calc(100vh - 50px)' }}>
      <div>
        <SideBarComponent {...args} />
      </div>
      <Flex
        alignItems="center"
        justifyContent="center"
        className="bg-blue-50 w-full"
      >
        Content
      </Flex>
    </Flex>
  )
}

export const SideBar = Template.bind({})

SideBar.args = {
  sideBarList,
  sideBarName: 'Ejemplo SideBar',
  sideBarSubTitle: 'Crédito Pre-puente',
  disabledOptionsTag: 'Próximamente',
  dangerZone: { show: true, text: 'Eliminar proyecto', active: false },
  flushSync: () => console.log('Hello'),
  isLoadingHeaderInfo: false,
  isLoadingSideBarList: false
}
