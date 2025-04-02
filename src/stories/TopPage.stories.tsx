import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { XCircleIcon } from '@heroicons/react/outline'
import TopPage from '../components/TopPage/TopPage'

const meta: Meta<typeof TopPage> = {
  title: 'Components/TopPage',
  component: TopPage,
  parameters: {
    layout: 'fullscreen'
  }
}

export default meta
type Story = StoryObj<typeof TopPage>

export const Default: Story = {
  args: {
    title: 'Example Title' as any,
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
    optionsBreadcrumbs: {
      options: [
        { name: 'Home', to: () => null },
        { name: 'Category', to: () => null }
      ]
    },
    tabs: {
      value: 0,
      setValue: (value) => console.log('Tab changed to', value),
      items: [{ label: 'Tab 1' }, { label: 'Tab 2' }]
    }
  }
}
