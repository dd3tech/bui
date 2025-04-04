import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  FilterBar as FilterBarComponent,
  FilterSearch
} from '../components/Filters'

const meta: Meta<typeof FilterBarComponent> = {
  title: 'Filters/FilterBar',
  component: FilterBarComponent
}

export default meta
type Story = StoryObj<typeof FilterBarComponent>

export const FilterBar: Story = {
  args: {
    className: 'h-12',
    isFlex: true
  },
  render: ({ className, isFlex }) => (
    <FilterBarComponent className={className} isFlex={isFlex}>
      <FilterBarComponent.Section borderRight className="w-96">
        <FilterSearch
          handleClearSearch={() => undefined}
          onChange={() => undefined}
        />
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
}
