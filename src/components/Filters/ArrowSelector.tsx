import { useCallback, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import Circle from 'components/Circle'
import { Flex } from 'components/Layout'
import Text from 'components/Typography'
import { composeClasses } from 'lib/classes'

export interface ArrowSelectorProps {
  /** Label to display between the arrows */
  label: string
  /** Function to call when the left arrow is clicked */
  onClickLeft: () => void
  /** Function to call when the right arrow is clicked */
  onClickRight: () => void
  /** Toggle options configuration */
  toggleOptions?: {
    /** Text to display for the first toggle option */
    firstOption: string
    /** Text to display for the second toggle option */
    secondOption: string
    /** Callback function triggered when the user selects an option */
    onOptionChange?: (option: string) => void
    /** Currently selected option to control the toggle state externally */
    optionSelected?: string
  }
}

export const ArrowSelector = ({
  label,
  onClickLeft,
  onClickRight,
  toggleOptions
}: ArrowSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState(
    toggleOptions?.optionSelected || toggleOptions?.firstOption
  )

  const handleOptionClick = useCallback(
    (option: string) => {
      if (option === selectedOption) return
      setSelectedOption(option)
      toggleOptions?.onOptionChange?.(option)
    },
    [toggleOptions, selectedOption]
  )
  const ToggleOption = ({
    option,
    isSelected
  }: {
    option: string
    isSelected: boolean
  }) => (
    <Flex
      justifyContent="center"
      alignItems="center"
      className={composeClasses(
        isSelected ? 'text-white' : 'text-gray-500',
        'relative z-10 rounded-full px-2 cursor-pointer text-xs text-center py-1'
      )}
      onClick={() => handleOptionClick(option)}
    >
      {option}
    </Flex>
  )

  return (
    <Flex
      role="arrow-selector"
      alignItems="center"
      gap="2"
      className="ml-0 md:ml-7 md:mb-0"
    >
      <Circle
        role="arrow-selector-left"
        style={{ width: 24, height: 24 }}
        className="border border-gray-300 bg-white hover:bg-blue-50 cursor-pointer transition-all ease-linear"
        onClick={onClickLeft}
      >
        <ChevronLeftIcon width={10} className="text-blue-700" />
      </Circle>

      <Flex alignItems="center" gap="2">
        <Text
          role="arrow-selector-label"
          size="xs"
          className="font-normal min-w-max text-gray-700"
        >
          {label}
        </Text>

        {toggleOptions && (
          <div className="relative grid grid-cols-2 bg-white border border-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 bg-blue-600 rounded-full transition-all h-full"
              style={{
                width: `${100 / 2}%`,
                transform: `translateX(${
                  selectedOption === toggleOptions.firstOption ? '0%' : '100%'
                })`
              }}
            />
            <ToggleOption
              option={toggleOptions.firstOption}
              isSelected={selectedOption === toggleOptions.firstOption}
            />
            <ToggleOption
              option={toggleOptions.secondOption}
              isSelected={selectedOption === toggleOptions.secondOption}
            />
          </div>
        )}
      </Flex>

      <Circle
        style={{ width: 24, height: 24 }}
        role="arrow-selector-right"
        className="border border-gray-300 bg-white hover:bg-blue-50 cursor-pointer transition-all ease-linear"
        onClick={onClickRight}
      >
        <ChevronRightIcon width={10} className="text-blue-700" />
      </Circle>
    </Flex>
  )
}

ArrowSelector.displayName = 'ArrowSelector'

export default ArrowSelector
