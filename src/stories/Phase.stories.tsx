import type { Meta, StoryObj } from '@storybook/react'
import PhaseComponents from '../components/Phase/Phase'
import { DocumentSearchIcon } from '@heroicons/react/outline'

const meta: Meta<typeof PhaseComponents> = {
  title: 'Components/Phase',
  component: PhaseComponents
}

export default meta
type Story = StoryObj<typeof PhaseComponents>

const data: typeof PhaseComponents['arguments']['listData'] = [
  { label: 'Anuales', status: 'completed' },
  { label: '4° Trimestre', status: 'missingInformation' },
  { label: '3° Trimestre', status: 'onValidation' },
  { label: '2° Trimestre', status: 'completed' },
  { label: '1° Trimestre', status: 'onValidation' }
]

export const Phase: Story = {
  args: {
    title: 'Title phase',
    variant: 'phases',
    icon: DocumentSearchIcon,
    listData: data,
    className: 'w-44 h-40',
    status: 'default'
  }
}
