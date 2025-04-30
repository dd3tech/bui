/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useMemo
} from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { StyleObject } from 'lib/styles'
import { composeClasses } from 'lib/classes'
import { Badge, Transition, Text, Flex, Button } from 'components'

export interface IMultiSelectOption {
  value: string | number
  label?: string
  disabled?: boolean
  selected?: boolean
}

export const getMultiSelectLabel = (
  key: string,
  optionsList: IMultiSelectOption[]
): string => {
  const found = optionsList.find((opt) => opt.value === key)
  return found?.label || key
}

export interface MultiSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelAll?: string
  endAdornment?: ReactNode
  startAdornment?: ReactNode
  classNameAdornment?: string
  rounded?: string
  large?: boolean
  optionsList: IMultiSelectOption[]
  isRequired?: boolean
  classNameDropdown?: string
  styleDropdown?: StyleObject
  onChangeSelect?: (option: IMultiSelectOption) => void
  isDisabled?: boolean
  buttonSubmit: {
    label: string
    onClick: () => void
  }
  buttonClear: {
    label: string
    onClick: () => void
  }
}

function MultiSelect({
  label,
  labelAll,
  className,
  classNameAdornment,
  large,
  style,
  optionsList,
  onChangeSelect,
  isDisabled,
  buttonSubmit,
  buttonClear,
  ...otherProps
}: MultiSelectProps) {
  const selectRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<IMultiSelectOption[]>(
    []
  )

  const [options, setOptions] = useState<IMultiSelectOption[]>(optionsList)

  const styles = {
    adornment: composeClasses(
      'text-gray-400 transition duration-500 ease-out focus:ease-in',
      classNameAdornment
    ),
    container: composeClasses(
      'relative placeholder-gray-400 mt-1 flex items-center justify-between font-medium gap-3 cursor-pointer',
      'border-solid border rounded-lg px-4',
      'transition duration-500 ease-out focus:ease-in border-gray-300',
      !isDisabled && !isOpen && `hover:shadow-lg hover:border-info`,
      isOpen && !isDisabled && 'border-blue-500',
      isDisabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
      large ? 'h-13' : 'h-12',
      className
    )
  }

  const handleClick = () => {
    if (isDisabled) return
    setIsOpen(!isOpen)
  }

  const handleOptionToggle = (option: IMultiSelectOption) => {
    if (option.disabled) return
    let updatedSelected: IMultiSelectOption[]
    if (selectedOptions.some((o) => o.value === option.value)) {
      updatedSelected = selectedOptions.filter((o) => o.value !== option.value)
    } else {
      updatedSelected = [...selectedOptions, option]
    }
    setSelectedOptions(updatedSelected)
    onChangeSelect?.(option)
  }

  const allSelected = useMemo(
    () =>
      options.filter((opt) => !opt.disabled).length > 0 &&
      options
        .filter((opt) => !opt.disabled)
        .every((opt) => selectedOptions.some((sel) => sel.value === opt.value)),
    [options, selectedOptions]
  )
  const handleSelectAll = () => {
    allSelected
      ? setSelectedOptions([])
      : setSelectedOptions(options.filter((opt) => !opt.disabled))
  }

  const handleClear = () => setSelectedOptions([])

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setOptions(optionsList)
  }, [optionsList])

  return (
    <div
      ref={selectRef}
      role="select-container-group"
      className={composeClasses(className, 'relative')}
    >
      <div
        role="select-container"
        className={composeClasses(
          styles.container,
          selectedOptions.length > 0 && 'bg-blue-100 border border-blue-600'
        )}
        style={{ zIndex: 2, ...style }}
        onClick={handleClick}
        data-testid="select-container"
      >
        <div className="flex flex-col w-full relative">
          <div className="relative flex items-center">
            <input
              {...otherProps}
              value={label || ''}
              className={composeClasses(
                'outline-none w-full font-medium bg-transparent'
              )}
              readOnly
              style={{
                cursor: 'inherit',
                paddingTop: 10,
                paddingBottom: 10
              }}
            />

            {selectedOptions.length > 0 && !allSelected && (
              <Badge value={selectedOptions.length} />
            )}
          </div>
        </div>
        <Transition
          alwaysRender
          show={isOpen && !isDisabled}
          animationStart="rotateRight"
          animationEnd="rotateRightBack"
          duration={200}
        >
          <ChevronDownIcon
            role="chevron"
            className="text-gray-400"
            width={20}
          />
        </Transition>
      </div>
      {isOpen && !isDisabled && (
        <Transition
          className="w-full z-50 absolute left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
          style={{ zIndex: 10 }}
        >
          <div className="px-4 py-1">
            <Text size="sm">{label}</Text>

            <div className="max-h-44 overflow-auto text-base">
              <ul>
                <li className="flex items-center mb-1 border-b pb-1 sticky top-0 bg-white">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    className="mr-2"
                    data-testid="select-all"
                  />
                  <span>{labelAll || 'All'}</span>
                </li>
                {options.map((option) => (
                  <li key={option.value} className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      checked={selectedOptions.some(
                        (o) => o.value === option.value
                      )}
                      onChange={() => handleOptionToggle(option)}
                      disabled={option.disabled}
                      className="mr-2"
                      data-testid={`option-${option.value}`}
                    />
                    <span className={option.disabled ? 'text-gray-400' : ''}>
                      {option.label || option.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Flex justifyContent="around" className="border-t py-2">
              <Button
                variant="ghost"
                onClick={buttonClear?.onClick || handleClear}
              >
                {buttonClear?.label}
              </Button>
              <Button onClick={buttonSubmit?.onClick} className="px-8">
                {buttonSubmit?.label}
              </Button>
            </Flex>
          </div>
        </Transition>
      )}
    </div>
  )
}

export default MultiSelect
