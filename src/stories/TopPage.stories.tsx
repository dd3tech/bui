import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/outline'
import TopPage from '../components/TopPage/TopPage'

export default {
  title: 'Components/TopPage',
  component: TopPage,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof TopPage>

const Template: ComponentStory<typeof TopPage> = (args) => <TopPage {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Example Title',
  description: 'This is a description for the TopPage component.',
  lastUpdate: {
    translation: 'es',
    date: new Date()
  },
  callToActionsButtons: [
    {
      label: 'Action 1',
      onClick: () => console.log('Action 1 clicked'),
      icon: <XCircleIcon />,
      variant: 'primary',
      isDisabled: true
    },
    {
      label: 'Action 2',
      onClick: () => console.log('Action 2 clicked'),
      icon: <XCircleIcon />,
      variant: 'secondary'
    }
  ],
  callToActionIcon: {
    titleIcon: <AcademicCapIcon />,
    onClick: () => console.log('Icon clicked'),
    isSelected: false,
    isDisabled: true
  },
  optionsBreadcrumbs: [
    { name: 'Home', to: () => null },
    { name: 'Category', to: () => null }
  ],
  tabs: {
    value: 0,
    setValue: (value) => console.log('Tab changed to', value),
    items: [
      { label: 'Tab 1', content: <div>Content for Tab 1</div> },
      { label: 'Tab 2', content: <div>Content for Tab 2</div> }
    ]
  }
}
