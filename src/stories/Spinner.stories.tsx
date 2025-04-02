import type { Meta, StoryObj } from '@storybook/react'
import SpinnerComponent from '../components/Spinner'

const meta: Meta<typeof SpinnerComponent> = {
  title: 'Controls/Spinner',
  component: SpinnerComponent
}

export default meta
type Story = StoryObj<typeof SpinnerComponent>

export const Spinner: Story = {
  args: {
    color: '#f51',
    width: '4rem',
    height: '4rem',
    border: 5
  }
}

export const PageLoader: Story = {
  args: {
    pageLoader: true
  }
}
