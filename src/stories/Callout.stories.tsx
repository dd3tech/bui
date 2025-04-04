import type { Meta, StoryObj } from '@storybook/react'
import CalloutComponent from '../components/Callout'
import { CheckCircleIcon } from '@heroicons/react/solid'

const meta: Meta<typeof CalloutComponent> = {
  title: 'Components/Callout',
  component: CalloutComponent
}

export default meta
type Story = StoryObj<typeof CalloutComponent>

export const Callout: Story = {
  args: {
    title: 'All systems operational',
    description: 'All systems are operational and functioning as expected.',
    icon: CheckCircleIcon
  }
}
