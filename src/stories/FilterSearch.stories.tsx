import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FilterSearch as FilterSearchComponent } from '../components/Filters'

export default {
  title: 'Filters/FilterSearch',
  component: FilterSearchComponent
} as ComponentMeta<typeof FilterSearchComponent>

const Template: ComponentStory<typeof FilterSearchComponent> = ({
  value,
  onChange,
  disabled
}: any) => (
  <FilterSearchComponent
    value={value}
    onChange={onChange}
    placeholder="Search"
    disabled={disabled}
  />
)

export const FilterSearch = Template.bind({})
FilterSearch.args = {
  value: '',
  onChange: () => console.log('Search'),
  disabled: false,
  className: 'w-24'
}
