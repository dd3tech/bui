/*
 * Copyright (c) DD360 and its affiliates.
 */

import {
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import ChevronDownIcon from '@heroicons/react/outline/ChevronDownIcon'
import { StyleObject } from 'lib/styles'
import { composeClasses } from 'lib/classes'
import { Transition, Text, Flex } from 'components'
import { CheckCircleIcon } from '@heroicons/react/outline'
import FormLabel from './FormLabel'

export interface ISelectOption {
  value: string | number
  label?: string
  disabled?: boolean
  selected?: boolean
}

export const getSingleSelectLabel = (
  key: string,
  optionsList: ISelectOption[]
): string => {
  const found = optionsList.find((opt) => opt.value === key)
  return found?.label || key
}

const getAnimationStyle = (isOpen: boolean): StyleObject => {
  return {
    visibility: isOpen ? 'visible' : 'hidden',
    transition:
      'opacity 251ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 167ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transform: isOpen
      ? 'scaleY(1) translateY(0)'
      : 'scaleY(0.4) translateY(-5px)',
    opacity: isOpen ? 1 : 0,
    transformOrigin: '100% 0%',
    maxHeight: '450px'
  }
}

export interface SingleSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  endAdornment?: ReactNode
  startAdornment?: ReactNode
  classNameAdornment?: string
  rounded?: string
  large?: boolean
  optionsList: ISelectOption[]
  isRequired?: boolean
  classNameDropdown?: string
  styleDropdown?: StyleObject
  onChangeSelect?: (option: ISelectOption) => void
  isDisabled?: boolean
  placeholder?: string
  isFilter?: boolean
}

function SingleSelect({
  label,
  className,
  classNameAdornment,
  style,
  optionsList,
  onChangeSelect,
  value,
  isDisabled = false,
  placeholder,
  isRequired,
  isFilter = true,
  ...otherProps
}: SingleSelectProps) {
  const selectRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
    null
  )

  const handleClick = () => {
    if (isDisabled) return
    setIsOpen(!isOpen)
  }

  const styles = {
    adornment: composeClasses(
      'text-gray-400 transition duration-500 ease-out focus:ease-in',
      classNameAdornment
    ),
    container: composeClasses(
      'relative placeholder-gray-400 flex items-center justify-between font-medium gap-3 h-10',
      isFilter ? 'bg-white' : 'bg-transparent',
      'border-solid border rounded-lg px-4',
      'transition duration-500 ease-out focus:ease-in border-gray-300',
      !isDisabled && !isOpen && `hover:shadow-lg hover:border-info`,
      isOpen && !isDisabled && 'border-blue-500',
      isDisabled
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'cursor-pointer ',
      className
    )
  }

  const handleSelect = (option: ISelectOption) => {
    if (option.disabled) return

    const originalOption = optionsList?.find(
      (opt) => String(opt?.value) === String(option?.value)
    )

    setSelectedOption(originalOption || option)
    setIsOpen(false)

    onChangeSelect?.(originalOption || option)
  }

  const optionsWithSelected = optionsList?.map((opt) => ({
    ...opt,
    selected:
      String(opt?.value) === String(value) ||
      String(opt?.label).toLowerCase() === String(value).toLowerCase()
  }))

  const getInputLabel = () => {
    if (!isFilter && !selectedOption) return ''
    if (!selectedOption) return placeholder || label || ''

    return selectedOption.label || selectedOption.value.toString()
  }

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
    const found = optionsList?.find(
      (opt) => String(opt?.value) === String(value)
    )

    const foundByLabel =
      !found && value
        ? optionsList?.find(
            (opt) =>
              String(opt?.label).toLowerCase() === String(value).toLowerCase()
          )
        : null

    setSelectedOption(found || foundByLabel || null)
  }, [value, optionsList])

  return (
    <div
      ref={selectRef}
      role="select-container-group"
      className={composeClasses(className, 'relative')}
      onClick={handleClick}
    >
      <div
        role="select-container"
        className={composeClasses(
          styles.container,
          isFilter &&
            !!selectedOption &&
            selectedOption.value !== '' &&
            'bg-blue-100 border border-blue-600'
        )}
        style={{ zIndex: 2, ...style }}
      >
        {!isFilter && (
          <FormLabel
            label={label ?? ''}
            isLabelScalded={!!selectedOption}
            isDisabled={isDisabled}
            isRequired={isRequired}
          />
        )}
        <input
          placeholder={isFilter ? placeholder : ''}
          value={getInputLabel()}
          {...otherProps}
          className={composeClasses(
            'outline-none w-full bg-transparent truncate text-sm',
            isFilter && '-mt-2'
          )}
          readOnly
          style={{
            cursor: 'inherit',
            paddingTop: 10
          }}
        />
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
        <Transition className="w-full absolute z-50">
          <div
            role="dropdown"
            className="relative left-0 z-50 w-full overflow-y-auto top-1 rounded-lg shadow-lg bg-white"
            style={{
              ...getAnimationStyle(isOpen),
              border: '1px solid #F9FAFB'
            }}
          >
            {isFilter && (
              <div className="h-8 p-2">
                <Text size="xs" textMuted500>
                  {label}
                </Text>
              </div>
            )}
            {optionsWithSelected?.map((option) => {
              const { value, label, disabled } = option
              return (
                <Flex
                  className={composeClasses(
                    'w-full px-2 py-2 hover:bg-blue-50 hover:text-blue-800',
                    option.selected && isFilter && 'text-blue-700'
                  )}
                  justifyContent="between"
                  alignItems="center"
                  key={value}
                >
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={composeClasses(
                      'block w-full text-left',
                      disabled && 'cursor-not-allowed opacity-50',
                      'whitespace-nowrap overflow-hidden overflow-ellipsis'
                    )}
                    disabled={disabled}
                  >
                    {label ?? value}
                  </button>

                  {option.selected && isFilter && (
                    <CheckCircleIcon width={20} />
                  )}
                </Flex>
              )
            })}
          </div>
        </Transition>
      )}
    </div>
  )
}
export default SingleSelect
