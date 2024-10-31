import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FilterBar as FilterBarComponent } from '../components/Filters'
import { FilterSearch } from './FilterSearch.stories'

export default {
  title: 'Filters/FilterBar',
  component: FilterBarComponent
} as ComponentMeta<typeof FilterBarComponent>

const Template: ComponentStory<typeof FilterBarComponent> = ({
  className,
  isFlex
}: any) => (
  <FilterBarComponent className={className} isFlex={isFlex}>
    <FilterBarComponent.Section borderRight className="w-96">
      <FilterSearch />
    </FilterBarComponent.Section>
    <FilterBarComponent.Section borderRight>
      <FilterBarComponent.Label number={10} label="Filter 1" />
    </FilterBarComponent.Section>
    <FilterBarComponent.Section borderRight>
      <FilterBarComponent.Toggle
        onToggle={() => undefined}
        isActive={true}
        iconOff={<span>A</span>}
        iconOn={<span>B</span>}
      />
    </FilterBarComponent.Section>
  </FilterBarComponent>
)

export const FilterBar = Template.bind({})
FilterBar.args = {
  className: 'h-12',
  isFlex: true
}
