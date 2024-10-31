import React from 'react'
import Text from 'components/Typography'
import Skeleton from 'components/Skeleton'

export interface FilterLabelProps {
  /** Number to display in the label */
  number: number
  /** Text to display in the label */
  label: string
  /** Whether the label is in a loading state */
  isLoading?: boolean
}

const FilterLabel: React.FC<FilterLabelProps> = ({
  number,
  label,
  isLoading
}) => {
  return (
    <Text role="filter-label" variant="p" className="flex gap-1 items-center">
      {isLoading ? (
        <Skeleton role="filter-labe-skeleton" className="w-6 h-5 rounded-md" />
      ) : (
        <Text role="filter-label-number" size="sm" className="text-blue-700">
          {number}
        </Text>
      )}
      <Text role="fiter-label-text" size="sm" className="text-gray-900">
        {label}
      </Text>
    </Text>
  )
}

export default FilterLabel
