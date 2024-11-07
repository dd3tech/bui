import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { XCircleIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import Input, { InputVariant } from 'components/Form'
import { composeClasses } from '../../lib/classes'

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
  /** Renders the search input in a compact size */
  smallSearch?: boolean
}

export const FilterSearch = ({
  value = '',
  label,
  variant = 'default',
  message,
  disabled,
  placeholder,
  onChange,
  smallSearch
}: FilterSearchProps) => {
  const [search, setSearch] = useState(value)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLDivElement | null>(null)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value
    setSearch(newValue)
    onChange(e)
  }

  const clearSearch = () => setSearch('')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [inputRef])

  return (
    <div
      ref={inputRef}
      className={composeClasses(
        'relative',
        smallSearch ? 'w-10 xl:w-full' : 'w-full'
      )}
      onClick={() => smallSearch && setIsExpanded(!isExpanded)}
    >
      <Input
        role="filter-search"
        message={message}
        variant={variant}
        label={label}
        placeholder={placeholder}
        className={composeClasses(
          'h-10 max-h-10 -mt-0.5 text-xs transition-all duration-300',
          smallSearch && 'rounded-full xl:rounded-xl',
          isExpanded ? 'w-64 xl:w-full' : 'w-full'
        )}
        style={{ backgroundColor: '#ffffff' }}
        value={search}
        disabled={disabled}
        startAdornment={
          <SearchIcon
            className={composeClasses(
              'text-gray-400',
              smallSearch
                ? 'absolute top-2 left-2.5 w-5 h-5 xl:w-3.5 xl:h-3.5 xl:relative xl:top-0 xl:left-0'
                : 'w-3.5 h-3.5'
            )}
          />
        }
        endAdornment={
          search && (
            <XCircleIcon
              onClick={clearSearch}
              className={composeClasses(
                'text-gray-400 w-4 h-4 cursor-pointer relative',
                search && !isExpanded && 'hidden xl:flex'
              )}
            />
          )
        }
        onClick={(e) => e.stopPropagation()}
        onChange={handleChange}
      />
    </div>
  )
}

FilterSearch.displayName = 'FilterSearch'

export default FilterSearch
