import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import SideBarComponent from '../components/SideBar/SideBar'
import DynamicHeroIcon from '../common/DynamicHeroIcon'

export default {
  title: 'Layout/SideBar',
  component: SideBarComponent
} as ComponentMeta<typeof SideBarComponent>

const Template: ComponentStory<typeof SideBarComponent> = (args) => (
  <SideBarComponent {...args} />
)

export const SideBar = Template.bind({})
SideBar.args = {
  sideBarList: [
    {
      title: 'Lista 1',
      active: true,
      to: () => console.log('Hola 1'),
      icon: <DynamicHeroIcon icon="HomeIcon" />
    },
    {
      title: 'Lista 2',
      active: false,
      to: () => console.log('Hola 2')
    },
    {
      title: 'Lista 3',
      active: false,
      to: () => console.log('Hola 3'),
      disabled: true
    },
    {
      title: 'Lista 4',
      active: false,
      to: () => console.log('Hola 4')
    }
  ],
  sideBarName: 'Ejemplo SideBar',
  sideBarSubTitle: 'Crédito Pre-puente',
  disabledOptionsTag: 'Próximamente',
  dangerZone: { show: true, text: 'Eliminar proyecto', active: false },
  flushSync: () => console.log('Hello'),
  isLoadingHeaderInfo: false,
  isLoadingSideBarList: false
}
