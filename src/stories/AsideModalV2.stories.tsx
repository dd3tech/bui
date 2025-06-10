import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from '../components/Buttons/Button'
import { TabPanel } from '../components/Tabs'
import AsideModalComponent, {
  ModalButton,
  ModalDescription
} from '../components/AsideModalV2'

export default {
  title: 'Modals/AsideModalV2',
  component: AsideModalComponent,
  argTypes: {
    position: {
      options: ['left', 'right'],
      control: { type: 'radio' }
    },
    titleVariant: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' }
    }
  }
} as ComponentMeta<typeof AsideModalComponent>

const sampleDescription: ModalDescription = {
  label: 'Add a general description of the main task',
  icon: 'InformationCircleIcon',
  classIcon: 'w-4 h-4 text-gray-500'
}

const sampleButtons: ModalButton[] = [
  {
    label: 'Cancel',
    variant: 'secondary',
    onClick: () => console.log('Cancel clicked')
  } as ModalButton,
  {
    label: 'Save',
    variant: 'primary',
    onClick: () => console.log('Save clicked')
  } as ModalButton
]

const Template: ComponentStory<typeof AsideModalComponent> = (args) => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <AsideModalComponent
        {...args}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  title: 'Basic Aside Modal',
  children: 'This is the basic content of the modal',
  description: sampleDescription,
  hideDivider: false
}

export const WithButtons = Template.bind({})
WithButtons.args = {
  ...Basic.args,
  title: 'Modal with Buttons',
  buttons: sampleButtons
}

export const WithSearch = Template.bind({})
WithSearch.args = {
  ...Basic.args,
  title: 'Modal with Search',
  search: {
    label: 'Search',
    placeholder: 'Type to search...',
    onChange: () => console.log('searching...')
  }
}

export const WithAllOptions = Template.bind({})
WithAllOptions.args = {
  ...Basic.args,
  title: 'Modal with Search',
  description: sampleDescription,
  buttons: sampleButtons,
  search: {
    label: 'Search',
    placeholder: 'Type to search...',
    onChange: () => console.log('searching...')
  }
}

export const WithTabs = (args) => {
  const [open, setOpen] = React.useState(false)
  const [tabSelected, setTabSelected] = React.useState(0)

  const tabs = {
    value: tabSelected,
    setValue: setTabSelected,
    items: [
      {
        label: 'Tab 1',
        description: sampleDescription,
        buttons: sampleButtons
      },
      {
        label: 'Tab 2',
        description: {
          label: 'Second tab description'
        },
        search: {
          label: 'Search',
          placeholder: 'Type to search...',
          onChange: () => console.log('searching...')
        }
      }
    ]
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal with Tabs</Button>
      <AsideModalComponent
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        tabs={tabs}
      >
        <TabPanel className="p-0" index={0} value={tabSelected}>
          Content for Tab 1
        </TabPanel>
        <TabPanel className="p-0" index={1} value={tabSelected}>
          Content for Tab 2
        </TabPanel>
      </AsideModalComponent>
    </>
  )
}
WithTabs.args = {
  title: 'Modal with Tabs',
  description: sampleDescription
}
