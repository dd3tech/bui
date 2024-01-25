import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import PhaseComponents from '../components/Phase/Phase'
import { DocumentSearchIcon } from '@heroicons/react/outline'

export default {
  title: 'Components/Phase',
  component: PhaseComponents
} as ComponentMeta<typeof PhaseComponents>

const data = [
  { label: 'Anuales', completed: true },
  { label: '4° Trimestre', completed: true },
  { label: '3° Trimestre', completed: false },
  { label: '2° Trimestre', completed: true },
  { label: '1° Trimestre', completed: false }
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
