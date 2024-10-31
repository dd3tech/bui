import { ChangeEventHandler, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import Input, { InputVariant } from 'components/Form'

export interface FilterSearchProps {
  /** Initial value of the search input */
  value?: string
  /** Label for the search input */
  label?: string
  /** Variant of the input */
  variant?: InputVariant
  /** Message to display below the input */
  message?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Placeholder text for the input */
  placeholder?: string
  /** Function to call when the input value changes */
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const FilterSearch = ({
  value = '',
  label,
  variant = 'default',
  message,
  disabled,
  placeholder,
  onChange
}: FilterSearchProps) => {
  const [search, setSearch] = useState(value)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value
    setSearch(newValue)
    onChange(e)
  }

  const clearSearch = () => setSearch('')

  return (
    <Input
      role="filter-search"
      message={message}
      variant={variant}
      label={label}
      placeholder={placeholder}
      className="w-full h-10 max-h-10 -mt-0.5 text-xs"
      style={{ backgroundColor: '#ffffff' }}
      value={search}
      disabled={disabled}
      startAdornment={<SearchIcon className="text-gray-400 w-3.5 h-3.5" />}
      endAdornment={
        search && (
          <XCircleIcon
            onClick={clearSearch}
            className="text-gray-400 w-4 h-4 cursor-pointer"
          />
        )
      }
      onChange={handleChange}
    />
  )
}

FilterSearch.displayName = 'FilterSearch'

export default FilterSearch
