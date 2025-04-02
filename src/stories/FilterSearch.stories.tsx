import type { Meta, StoryObj } from '@storybook/react'
import { FilterSearch as FilterSearchComponent } from '../components/Filters'

const meta: Meta<typeof FilterSearchComponent> = {
  title: 'Filters/FilterSearch',
  component: FilterSearchComponent
}

export default meta
type Story = StoryObj<typeof FilterSearchComponent>

export const FilterSearch: Story = {
  args: {
    value: '',
    onChange: () => console.log('Search'),
    disabled: false,
    placeholder: 'Search'
  }
}
