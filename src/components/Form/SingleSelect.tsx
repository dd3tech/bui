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
}

function SingleSelect({
  label,
  className,
  classNameAdornment,
  large,
  style,
  optionsList,
  onChangeSelect,
  value,
  isDisabled,
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

  const [options, setOptions] = useState<ISelectOption[]>(optionsList)

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

  const handleSelect = (option: ISelectOption) => {
    if (option.disabled) return

    const updatedOptions = options.map((opt) =>
      opt.value === option.value
        ? { ...opt, selected: true }
        : { ...opt, selected: false }
    )

    setOptions(updatedOptions)
    setSelectedOption(option)
    setIsOpen(false)

    onChangeSelect?.(option)
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
    if (!value) return
    const selected = optionsList.find((option) => option.value === value)
    setSelectedOption(selected ?? null)
    setOptions(
      optionsList.map((option) =>
        option.value === value ? { ...option, selected: true } : option
      )
    )
  }, [])

  return (
    <div
      ref={selectRef}
      role="select-container-group"
      className={composeClasses(className, 'relative')}
      onClick={handleClick}
    >
      <div
        role="select-container"
        className={styles.container}
        style={{ zIndex: 2, ...style }}
      >
        <div className="flex flex-col w-full relative">
          <div className="relative">
            <input
              {...otherProps}
              value={selectedOption?.label ?? optionsList?.[0]?.label}
              className={composeClasses(
                'outline-none w-full font-medium bg-transparent'
              )}
              placeholder=""
              readOnly
              style={{
                cursor: 'inherit',
                paddingTop: 10,
                paddingBottom: 10
              }}
            />
          </div>
        </div>

        <Transition
          alwaysRender
          show={isOpen || !isDisabled}
          animationStart="rotateRight"
          animationEnd="rotateRightBack"
          duration={200}
        >
          <ChevronDownIcon
            role="chevron"
            className="text-gray-400"
            width={18}
          />
        </Transition>
      </div>
      {isOpen && !isDisabled && (
        <Transition className="w-full z-50">
          <div
            role="dropdown"
            className={composeClasses(
              'absolute left-0 z-10 w-full bg-white overflow-y-auto top-13 rounded-lg shadow-lg'
            )}
            style={{
              ...getAnimationStyle(isOpen)
            }}
          >
            <div className="h-8 p-2">
              <Text size="xs" textMuted500>
                {label}
              </Text>
            </div>
            {options.map((option) => {
              const { value, label, disabled } = option

              return (
                <Flex
                  className={composeClasses(
                    'w-full px-2 py-2 hover:bg-gray-100',
                    option.selected && 'text-blue-700'
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

                  {option.selected && <CheckCircleIcon width={20} />}
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
