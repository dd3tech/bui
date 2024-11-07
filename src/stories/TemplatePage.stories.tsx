import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { XCircleIcon, AcademicCapIcon } from '@heroicons/react/outline'
import TemplatePage from '../components/TemplatePage/TemplatePage'

export default {
  title: 'Components/TemplatePage',
  component: TemplatePage,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof TemplatePage>

const Template: ComponentStory<typeof TemplatePage> = (args) => (
  <TemplatePage {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Sample Page Title',
  description: 'This is a detailed description of the TemplatePage component.',
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
  optionsBreadcrumbs: [
    { name: 'Home', to: () => null },
    { name: 'Category', to: () => null }
  ],
  tabs: {
    value: 0,
    setValue: (value) => console.log('Tab switched to', value),
    items: [{ label: 'Tab 1' }, { label: 'Tab 2' }]
  },
  children: (
    <p>This is the primary content area for the TemplatePage component.</p>
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
        initialValue: ['option1'],
        className: 'w-24'
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
    label: 'Reset',
    onClick: () => alert('Filters have been reset')
  },
  callToAction: {
    onClick: () => alert('Action executed'),
    label: 'Click here',
    icon: 'AcademicCapIcon'
  },
  arrowSelector: {
    label: 'Move to Month',
    onClickLeft: () => console.log('Navigated left'),
    onClickRight: () => console.log('Navigated right')
  }
}
