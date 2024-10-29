import { composeClasses } from 'lib/classes'
import React from 'react'
import Section from './Section'
import FilterLabel from './FilterLabel'
import ToggleButton from './ToggleButton'

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child elements to be rendered inside the FilterBar */
  children?: React.ReactNode
  /** Whether the FilterBar should use flexbox layout */
  isFlex?: boolean
  /** Additional class names to apply to the FilterBar */
  className?: string
}

export const FilterBar = ({
  children,
  isFlex = true,
  className,
  ...props
}: FilterBarProps) => {
  return (
    <div
      role="filter-bar"
      className={composeClasses(
        'p-2.5 bg-gray-100 rounded-lg',
        isFlex && 'flex items-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

FilterBar.Section = Section
FilterBar.Label = FilterLabel
FilterBar.Toggle = ToggleButton
FilterBar.displayName = 'FilterBar'

export default FilterBar
