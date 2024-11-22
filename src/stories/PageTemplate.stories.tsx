import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/outline'
import PageTemplate from '../components/PageTemplate/PageTemplate'

export default {
  title: 'Components/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof PageTemplate>

const Template: ComponentStory<typeof PageTemplate> = (args) => (
  <PageTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: {
    label: 'Title',
    isLoading: false
  },
  description: 'This is a detailed description of the PageTemplate component.',
  lastUpdate: {
    translation: 'en',
    date: new Date()
  },
  callToActionsButtons: [
    {
      label: 'Primary Action',
      onClick: () => console.log('Primary Action clicked'),
      icon: <XCircleIcon />,
      variant: 'primary',
      isDisabled: true
    },
    {
      label: 'Secondary Action',
      onClick: () => console.log('Secondary Action clicked'),
      icon: <XCircleIcon />,
      variant: 'secondary'
    }
  ],
  callToActionIcon: {
    titleIcon: <AcademicCapIcon />,
    onClick: () => console.log('Icon button clicked'),
    isSelected: false,
    isDisabled: true
  },
  optionsBreadcrumbs: {
    options: [
      { name: 'Home', to: '/home' },
      { name: 'Category', to: '/category' }
    ]
  },
  tabs: {
    value: 0,
    setValue: (value) => console.log('Tab switched to', value),
    items: [{ label: 'Tab 1' }, { label: 'Tab 2' }]
  },
  children: (
    <p>This is the primary content area for the PageTemplate component.</p>
  ),
  footer: (
    <div className="bg-gray-100 text-gray-500 w-full flex justify-center py-2">
      Footer
    </div>
  ),
  results: {
    number: 10,
    label: 'Results found'
  },
  viewToggle: {
    onToggle: () => console.log('View toggled'),
    isActive: false,
    iconOff: <span>A</span>,
    iconOn: <span>B</span>
  },
  search: {
    label: 'Search',
    placeholder: 'Type to search...'
  },
  filters: {
    dropdownCheckbox: [
      {
        cancelText: 'Cancel',
        confirmText: 'Confirm',
        onSubmit: () => console.log('Checkbox filter submitted'),
        onClose: () => console.log('Checkbox filter closed'),
        title: 'Filter Options',
        align: 'left',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ],
        allText: 'Select All',
        initialValue: ['option1']
      }
    ],
    dropdownRangeSlider: [
      {
        cancelText: 'Cancel',
        confirmText: 'Confirm',
        onSubmit: () => console.log('Range filter submitted'),
        onClose: () => console.log('Range filter closed'),
        title: 'Select Range',
        align: 'left',
        min: 0,
        max: 100,
        initMaxValue: 50,
        initMinValue: 10,
        unitName: 'units'
      }
    ]
  },
  clearFilters: {
    label: 'Restore',
    onClick: () => alert('Filters have been reset')
  },
  arrowSelector: {
    label: 'Move to Month',
    onClickLeft: () => console.log('Navigated left'),
    onClickRight: () => console.log('Navigated right')
  }
}
