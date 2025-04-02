import type { Meta, StoryObj } from '@storybook/react'
import { Language as LanguageComponent } from '../components/Navbar'

const meta: Meta<typeof LanguageComponent> = {
  title: 'Components/Language',
  component: LanguageComponent
}

export default meta
type Story = StoryObj<typeof LanguageComponent>

export const Language: Story = {
  args: {
    isNavbar: true
  }
}
