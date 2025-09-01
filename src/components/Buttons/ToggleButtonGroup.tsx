import type React from 'react'
import { useState } from 'react'

export type ToggleOption = {
  id: string
  label: string
  disabled?: boolean
  tooltip?: string
}

export type ToggleGroupProps = {
  items: ToggleOption[]
  kind: 'single' | 'group'
  value?: string | boolean | null
  defaultValue?: string | boolean | null
  onChange?: (value: string | boolean | null) => void
  allowDeselect?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
}

const ToggleButtonGroup: React.FC<ToggleGroupProps> = ({
  items,
  kind = 'group',
  value,
  defaultValue,
  onChange,
  allowDeselect = false,
  size = 'xs',
  className = '',
  'aria-label': ariaLabel
}) => {
  // Internal state
  const [internalValue, setInternalValue] = useState(() => {
    if (kind === 'single') {
      return defaultValue === true ? items[0]?.id : null
    }
    return defaultValue || null
  })

  // Current value
  const currentValue = value !== undefined ? value : internalValue

  // Helper function to get selected ID
  const getSelectedId = (
    kind: 'single' | 'group',
    currentValue: string | boolean | null,
    items: ToggleOption[]
  ): string | null => {
    if (kind === 'single') {
      const isFirstItemSelected =
        currentValue === true || currentValue === items[0]?.id
      return isFirstItemSelected ? items[0]?.id : null
    }
    return currentValue as string | null
  }

  // Convert to internal format
  const selectedId = getSelectedId(kind, currentValue, items)

  const handleChange = (newValue: string | null) => {
    const finalValue = kind === 'single' ? newValue === items[0]?.id : newValue

    if (onChange) {
      onChange(finalValue)
    }

    // Update internal state if not controlled
    if (value === undefined) {
      setInternalValue(newValue)
    }
  }

  const handleClick = (option: ToggleOption) => {
    if (option.disabled) return

    const currentId = selectedId
    let newId: string | null

    if (kind === 'single') {
      // Single toggle
      newId = currentId === option.id ? null : option.id
    } else {
      // Group toggle with allow deselect
      if (currentId === option.id && allowDeselect) {
        newId = null
      } else {
        newId = option.id
      }
    }

    handleChange(newId)
  }

  // Helper functions for classes
  const getButtonClasses = (
    isSelected: boolean,
    size: string,
    disabled: boolean,
    customClassName?: string
  ) => {
    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-2.5 text-lg'
    }

    return `
      ${sizeClasses[size as keyof typeof sizeClasses]}
      rounded-full border border-transparent
      transition-colors duration-150
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 px-6
      ${
        isSelected
          ? 'bg-blue-600 text-white shadow-none'
          : 'bg-gray-100 text-gray-700 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] hover:bg-white hover:border-gray-300'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${customClassName || ''}
    `.trim()
  }

  const getContainerClasses = (customClassName: string) => {
    return `inline-flex gap-2 p-1 rounded-2xl bg-transparent ${customClassName}`
  }

  // Single toggle
  if (kind === 'single') {
    const option = items[0]
    const isSelected = selectedId === option.id

    return (
      <div className={`inline-flex ${className}`}>
        <button
          role="switch"
          aria-checked={isSelected}
          aria-label={ariaLabel || option.label}
          disabled={option.disabled}
          onClick={() => handleClick(option)}
          className={getButtonClasses(isSelected, size, !!option.disabled)}
          title={option.tooltip}
        >
          {option.label}
        </button>
      </div>
    )
  }

  // Group toggle
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={getContainerClasses(className)}
    >
      {items.map((option) => {
        const isSelected = selectedId === option.id

        return (
          <button
            key={option.id}
            role="radio"
            aria-checked={isSelected}
            disabled={option.disabled}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => handleClick(option)}
            className={getButtonClasses(isSelected, size, !!option.disabled)}
            title={option.tooltip}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default ToggleButtonGroup
