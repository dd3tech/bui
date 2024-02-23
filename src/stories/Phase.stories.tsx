import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PhaseComponents from '../components/Phase/Phase'
import { DocumentSearchIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/Phase',
  component: PhaseComponents
} as ComponentMeta<typeof PhaseComponents>

const data = [
  { label: 'Anuales', status: 'completed' },
  { label: '4° Trimestre', status: 'missingInformation' },
  { label: '3° Trimestre', status: 'onValidation' },
  { label: '2° Trimestre', status: 'completed' },
  { label: '1° Trimestre', status: 'onValidation' }
]

const Template: ComponentStory<typeof PhaseComponents> = (args) => (
  <PhaseComponents {...args} />
)

export const Phase = Template.bind({})
Phase.args = {
  title: 'Title phase',
  variant: 'phases',
  icon: DocumentSearchIcon,
  listData: data,
  className: 'w-44 h-40',
  status: 'default'
}
