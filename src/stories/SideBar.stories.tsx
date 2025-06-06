import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HomeIcon } from '@heroicons/react/outline'
import ExclamationIcon from '@heroicons/react/solid/ExclamationIcon'
import SideBarComponent from '../components/SideBar/SideBar'
import Flex from '../components/Layout/Flex'

const meta: Meta<typeof SideBarComponent> = {
  title: 'Layout/SideBar',
  component: SideBarComponent,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof SideBarComponent>

const subItems = [
  {
    title: 'SubItem 1',
    active: true,
    goTo: () => console.log('subItem 1.1'),
    Chip: <div className="bg-red-400 rounded-full w-2.5 h-2.5" />
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
        goTo: () => console.log('childrenSubItem 1.1')
      },
      {
        title: 'ChildrenSubItem 2',
        active: false,
        Chip: <div className="bg-yellow-400 rounded-full w-2.5 h-2.5" />,
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
    Chip: 4
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
    Chip: '+99',
    ChipColor: 'bg-red-500',
    ChipTextColor: 'text-yellow-50'
  },
  {
    title: 'Information 3',
    active: false,
    isOpen: false,
    disabled: true,
    subItems: subItems,
    Chip: <ExclamationIcon className="w-4 h-4 text-yellow-400" />,
    ChipColor: 'bg-yellow-500'
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
    Chip: '+99',
    ChipColor: 'bg-red-500',
    ChipTextColor: 'text-yellow-50'
  }
]

export const SideBar: Story = {
  args: {
    sideBarList,
    sideBarName: 'Ejemplo SideBar',
    sideBarSubTitle: 'Crédito Pre-puente',
    disabledOptionsTag: 'Próximamente',
    dangerZone: { show: true, text: 'Eliminar proyecto', active: false },
    flushSync: () => console.log('Hello') as any,
    isLoadingHeaderInfo: false,
    isLoadingSideBarList: false,
    activeDropdown: true,
    dropdownButtonText: 'Create New',
    dropdownButtonCallback: () => console.log('Callback'),
    dropdownList: [
      {
        name: 'Dropdown 1',
        goTo: () => console.log('Dropdown 1')
      },
      {
        name: 'Dropdown 2',
        isActive: true,
        goTo: () => console.log('Dropdown 2')
      },
      {
        name: 'Dropdown 3',
        goTo: () => console.log('Dropdown 3')
      }
    ]
  },
  render: (args) => (
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
