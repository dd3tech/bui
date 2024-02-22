import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { HomeIcon } from '@heroicons/react/outline'
import ExclamationIcon from '@heroicons/react/solid/ExclamationIcon'
import SideBarComponent from '../components/SideBar/SideBar'
import Flex from '../components/Layout/Flex'

export default {
  title: 'Layout/SideBar',
  component: SideBarComponent,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof SideBarComponent>

const subItems = [
  {
    title: 'SubItem 1',
    active: true,
    goTo: () => console.log('subItem 1.1'),
    badge: '3',
    badgeColor: 'bg-red-500',
    badgeTextColor: 'text-yellow-50'
  },
  {
    title: 'SubItem 2',
    active: false,
    goTo: () => console.log('subItem 1.2')
  },
  {
    title: 'Sub-sub Item 3',
    active: false,
    goTo: () => console.log('subItem 1.3'),
    subItems: [
      {
        title: 'ChildrenSubItem 1',
        active: false,
        disabled: true,
        goTo: () => console.log('childrenSubItem 1.1'),
        badge: '1'
      },
      {
        title: 'ChildrenSubItem 2',
        active: false,
        // hidden: true,
        goTo: () => console.log('childrenSubItem 1.2')
      }
    ]
  }
]

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
    subItems: [
      {
        title: 'SubItem 1',
        active: true,
        goTo: () => console.log('subItem 1.1')
      },
      {
        title: 'SubItem 2',
        active: false,
        goTo: () => console.log('subItem 1.2')
      },
      {
        title: 'Sub-sub Item 3',
        active: false,
        goTo: () => console.log('subItem 1.3'),
        subItems: [
          {
            title: 'ChildrenSubItem 1',
            active: true,
            goTo: () => console.log('childrenSubItem 1.1')
          },
          {
            title: 'ChildrenSubItem 2',
            active: false,
            goTo: () => console.log('childrenSubItem 1.2')
          }
        ]
      }
    ],
    badge: '+99',
    badgeColor: 'bg-red-500',
    badgeTextColor: 'text-yellow-50'
  },
  {
    title: 'Information 3',
    active: false,
    isOpen: false,
    disabled: true,
    subItems: subItems,
    badge: <ExclamationIcon className="w-4 h-4 text-yellow-400" />,
    badgeColor: 'bg-yellow-500'
  },
  {
    title: 'Information 4',
    active: false,
    isOpen: false,
    goTo: () => console.log('Item 4')
  },
  {
    title: 'Information 5',
    active: false,
    isOpen: false,
    subItems: subItems,
    badge: '+99',
    badgeColor: 'bg-red-500',
    badgeTextColor: 'text-yellow-50'
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
